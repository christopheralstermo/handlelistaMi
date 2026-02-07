<script setup lang="ts">
import { ref } from 'vue'

interface ItemInput {
  name: string
  quantity: number
  price: number
}

const emit = defineEmits<{
  (e: 'add', item: ItemInput): void
  (e: 'store-change', store: string): void
  (e: 'view-change', value: boolean): void
}>()

const name = ref('')
const quantity = ref<string>('')
const price = ref<string>('')

const selectedStore = ref('all')

const viewMode = ref(false)


function addItem() {
  if (!name.value.trim()) return

  emit('add', {
    name: name.value,
    quantity: Number(quantity.value),
    price: Number(price.value)
  })

  // reset fields
  name.value = ''
  quantity.value = ''
  price.value = ''
}

function onStoreChange() {
  emit('store-change', selectedStore.value)
}

function theSwitch() {
  viewMode.value = !viewMode.value
  emit('view-change', viewMode.value)
}

</script>

<template>
  <div style="display: flex;">
    <div class="add-item">
      <input
          v-model="name"
          placeholder="Vare"
      />

      <input
          type="number"
          v-model="price"
          min="0"
          step="0.01"
          placeholder="Pris"
      />

      <input
          type="number"
          v-model="quantity"
          min="1"
          placeholder="Antall"
      />


      <button @click="addItem">
        Legg til
      </button>

      <select v-model="selectedStore" @change="onStoreChange">
        <option value="all">Alle</option>
        <option value="rema">Rema</option>
        <option value="kiwi">Kiwi</option>
        <option value="meny">Meny</option>
        <option value="extra">Extra</option>
        <option value="coop">Coop Obs</option>
      </select>
    </div>

    <div class="navigation_buttons">
      <button class="squareButton" @click="theSwitch">Switch</button>
    </div>

  </div>


</template>

<style scoped>
.add-item {
  display: flex;
  width: 40vh;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem;
}

input,
button,
select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
  border-radius: 13px;
}

.navigation_buttons {
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.squareButton {
  width: 100%;
  height: 25%;
}

.square {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  font-size: 1.2rem;
}

</style>
