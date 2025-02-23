<script setup lang="ts">
import type { TableRow } from "#ui/types";
import type { Item } from "~/shared/Item.interface";
import {useItemsStore} from "~/stores/itemsStore";
const columns = [
  { key: '_id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'image_url', label: 'Image' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'lastUpdated', label: 'Last updated' },
  { key: 'actions', label: 'Actions' },
]

const itemsStore = useItemsStore();

await callOnce(itemsStore.fetch);

const items: Ref<Array<Item>> = storeToRefs(itemsStore).items;

const toast = useToast();

onMounted(() => {
  useWebsocket(toast);
})

async function updateItem(id: string, quantity: number) {
  const { error } = await itemsStore.updateQuantity(id, quantity);
  if(error) {
    toast.add(error);
  }
}

async function deleteItem(id: string) {
  const { error } = await itemsStore.delete(id);
  if(error) {
    toast.add(error);
  }
}

</script>

<template>
  <UContainer>
    <h2 class="font-mono text-center text-2xl mt-3 mb-3">Inventory manager</h2>
    <AddItem />
    <ListComponent :items="items as TableRow[]" :columns="columns" @update-quantity="updateItem" @on-delete="deleteItem"  />
  </UContainer>
</template>
