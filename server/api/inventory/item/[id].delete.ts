import {defineWebsocketEventHandler} from "~/server/utils/websocketHandler";
import {WebSocketMessageTypes} from "#shared/websocketMessage.interface";

export default defineWebsocketEventHandler(async (event) => {
    try {
        const data = await Item.deleteOne({ _id: event.context.params?.id })
        return { ...data, _id: event.context.params?.id };
    }
    catch (error) {
        return error
    }
}, {type: WebSocketMessageTypes.DELETE, entity: 'InventoryItem'});