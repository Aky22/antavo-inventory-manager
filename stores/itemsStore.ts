import type {Item} from "~/shared/Item.interface";

export const useItemsStore = defineStore('itemsStore', {
    state: () => ({
        items: [] as Item[]
    }),
    actions: {
        removeFromList(id: string) {
            this.items = this.items.filter(item => item._id !== id);
        },
        addItem(item: Item) {
            this.items.push(item);
        },
        async fetch() {
            this.items = await $fetch<Item[]>('/api/inventory/item/list');
        },
        async create(item: Item) {
            const data = await $fetch<Item>('/api/inventory/item', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.items.push(data);
        },
        async delete(id: string) {
            const deleted = this.items.find(item => item._id === id);
            this.removeFromList(id);
            let error = null;
            try {
                await $fetch<{
                    _id: string,
                    acknowledged: boolean,
                    deletedCount: number,
                }>(`/api/inventory/item/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            } catch(e) {
                console.error(e);
                this.items.push(deleted as Item);
                error = {
                    title: 'Error',
                    description: `Failed to delete item: ${e}`,
                    timeout: 3000,
                    icon: 'i-mi:circle-error',
                    color: 'red',
                }
            }
            return {error}
        },
        async updateQuantity(id: string, quantity: number) {
            const itemId = this.items.findIndex(item => item._id === id);
            const oldData = {
                ...this.items[itemId]
            };
            this.items[itemId].quantity = quantity
            this.items[itemId].lastUpdated = new Date().toISOString();
            let error = null;
            try {
                const response = await $fetch<Item>(`/api/inventory/item/${id}?lastUpdated=${oldData.lastUpdated}`, {
                    method: 'PATCH',
                    body: JSON.stringify({quantity, lastUpdated: this.items[itemId].lastUpdated}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if(response.lastUpdated !== this.items[itemId].lastUpdated) {
                    this.items[itemId] = oldData;
                    console.error('Data is out of date');
                }
            } catch(e) {
                console.error(e);
                this.items[itemId] = oldData;
                error = {
                    title: 'Error',
                    // @ts-expect-error Because the catch param must be any on unknown and the ide said that a is unknown
                    description: e.data.message,
                    timeout: 3000,
                    icon: 'i-mi:circle-error',
                    color: 'red',
                    actions: [{
                        label: 'Refresh the list',
                        click: () => {
                            this.fetch();
                        }
                    }]
                }
            }
            return {error}
        }
    }
})