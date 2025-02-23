<script setup lang="ts">
import InputComponent from "~/components/InputComponent.vue";
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";
import {useItemsStore} from "~/stores/itemsStore";

const itemsStore = useItemsStore();

const isOpen = ref(false);

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  image_url: z.string().nonempty('Image URL is required'),
  quantity: z.number().int().positive('Quantity must be a positive number'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  image_url: undefined,
  quantity: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const now = new Date().toISOString()
  const eventData = {...event.data};
  isOpen.value = false;
  state.name = undefined;
  state.image_url = undefined;
  state.quantity = undefined;
  await itemsStore.create({...eventData, lastUpdated: now})
}

</script>

<template>
  <div class="text-right mt-3 mb-3">
    <UButton icon="i-material-symbols:add-circle" @click="isOpen = true">Add item</UButton>

    <USlideover v-model="isOpen">
      <div class="p-4 flex-1">
        <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            class="flex sm:hidden absolute end-5 top-5 z-10"
            square
            padded
            @click="isOpen = false"
        />
        <UContainer class="text-right">
          <UForm :schema="schema" :state="state" @submit="onSubmit">
            <h2 class="text-lg">Add inventory item</h2>
            <UFormGroup label="Name" name="name">
              <InputComponent v-model="state.name" placeholder="Name" />
            </UFormGroup>
            <UFormGroup label="Image URL" name="image_url">
              <InputComponent v-model="state.image_url" placeholder="Image URL" />
            </UFormGroup>
            <UFormGroup label="Quantity" name="quantity">
              <InputComponent v-model="state.quantity" placeholder="Quantity" type="number" />
            </UFormGroup>
            <UButton type="submit">Add</UButton>
          </UForm>
        </UContainer>
      </div>
    </USlideover>
  </div>
</template>

<style scoped>

</style>