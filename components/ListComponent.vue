<script setup lang="ts">
import type {TableRow} from "#ui/types";
const props = defineProps({
  items: {
    type: Array as PropType<TableRow[]>,
    required: true
  },
  columns: {
    type: Array as PropType<{ key: string, label: string }[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'updateQuantity', id: string, quantity: number): void,
  (e: 'onDelete', id: string): void
}>()

const updateQuantity = (id: string, quantity: number) => {
  emit('updateQuantity', id, quantity)
}

const onDelete = (id: string) => {
  emit('onDelete', id)
}

const { items, columns } = toRefs(props);
</script>

<template>
  <UTable
      :rows="items"
        :columns="columns"
        class="w-full flex border border-gray-200 dark:border-gray-700 relative rounded-t-md rounded-b-md not-prose bg-white dark:bg-gray-900 overflow-hidden"
  >
    <template #image_url-data="{ row }">
      <UPopover mode="hover">
        <img :src="row.image_url" :alt="row.name" class="w-6" />
        <template #panel>
          <img :src="row.image_url" :alt="row.name" class="w-48" />
        </template>
      </UPopover>
    </template>

    <template #lastUpdated-data="{ row }">
      <span>{{ new Date(row.lastUpdated).toLocaleString() }}</span>
    </template>

    <template #actions-data="{ row }">
      <div class="flex items-center space-x-2">
        <UInput
            type="number"
            size="lg"
            icon="i-material-symbols:production-quantity-limits"
            :model-value="row.quantity"
            @change="updateQuantity(row._id, $event)"
        />
        <UButton icon="i-material-symbols-light:delete" color="red" class="rounded-full" @click="onDelete(row._id)" />
      </div>
    </template>

  </UTable>
</template>