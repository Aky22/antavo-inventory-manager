import {useItemsStore} from "~/stores/itemsStore";
import type {Item} from "#shared/Item.interface";
import type {TableRow} from "#ui/types";
//@ts-expect-error Because the Notification is just a type declaration, it's not available at runtime
import type {Notification} from '@nuxt/ui/dist/runtime/types';
import {WebSocketMessageTypes} from "#shared/websocketMessage.interface";

export const useWebsocket = (toast: {
    add: (notification: Partial<Notification>) => void;
    remove: (id: string) => void;
    update: (id: string, notification: Partial<Notification>) => void;
    clear: () => void;
}) => {
    const isSecured = location.protocol === 'https:';
    const wsProtocol = isSecured ? 'wss' : 'ws';
    const wsUrl = `${wsProtocol}://${location.host}/_ws`;
    const ws = new WebSocket(wsUrl);
    const itemsStore = useItemsStore();
    const items: Ref<Array<Item>> = storeToRefs(itemsStore).items;
    ws.onmessage = (event) => {
        const { data } = event;
        const d = JSON.parse(data);
        if(d.entity === 'InventoryItem') {
            if(d.type === WebSocketMessageTypes.PATCH) {
                const item = items.value.find((item: TableRow) => item._id === d.message._id);
                if (item) {
                    if(item.lastUpdated !== d.message.lastUpdated) {
                        toast.add({
                            title: 'Item updated!',
                            description: `${d.message.name}'s quantity has been updated`,
                            icon: 'i-material-symbols:info',
                            timeout: 3000,
                            color: 'orange'
                        });
                    }
                    item.quantity = d.message.quantity;
                    item.lastUpdated = d.message.lastUpdated;
                }
            }

            if(d.type === WebSocketMessageTypes.DELETE) {
                itemsStore.removeFromList(d.message._id);
                toast.add({
                    title: 'Item deleted!',
                    description: `One item has been deleted! Item id: ${d.message._id}`,
                    icon: 'i-material-symbols:info',
                    timeout: 3000,
                    color: 'red'
                });
            }

            if(d.type === WebSocketMessageTypes.POST) {
                toast.add({
                    title: 'Item added!',
                    description: `${d.message.name} has been added`,
                    icon: 'i-material-symbols:info',
                    timeout: 0,
                    color: 'green',
                    actions: [{
                        label: 'Refresh the list',
                        click: () => {
                            itemsStore.fetch();
                        }
                    }]
                });
            }

        }
    }
    ws.onopen = (message) => {
        console.log(message);
        console.log('WebSocket connection established');
    }
    ws.onclose = () => {
        console.log('WebSocket connection closed');
    }
    ws.onerror = (error) => {
        console.error(error);
    }
    return ws;
}