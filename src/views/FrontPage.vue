<script setup lang="ts">
import TheList from "@/components/TheList.vue"
import AddItem from "@/components/AddItem.vue"
import { ref, watch } from "vue"
import { ShoppingList } from "@/model/ShoppingList"
import { Item } from "@/model/Item"
import { defaultItems } from '@/data/defaultItems'

const saved = localStorage.getItem('shopping-list-v1')

const activeList = ref(
    saved
        ? ShoppingList.fromJSON(JSON.parse(saved))
        : new ShoppingList(
            1,
            "Min liste",
            defaultItems.map((i, idx) =>
                new Item(idx, i.name, i.quantity, i.price)
            )
        )
)

const compactView = ref(false)
const showAddItem = ref(false)

function theSwitch() {
  compactView.value = !compactView.value
}

function addItem(payload: { name: string; quantity: number; price: number }) {
  activeList.value.addItem(
      new Item(Date.now(), payload.name, payload.quantity, payload.price)
  )
}

function deleteItem(id: number) {
  activeList.value.deleteItem(id)
}

function toggleChecked(id: number) {
  activeList.value.toggleChecked(id)
}

function setPriority(p: { id: number; value: boolean }) {
  activeList.value.setPriority(p.id, p.value)
}

function setActiveStore(store: string) {
  activeList.value.setActiveStore(store)
}

watch(
    activeList,
    v => localStorage.setItem('shopping-list-v1', JSON.stringify(v)),
    { deep: true }
)
</script>

<template>
  <div class="app">
    <div class="topButtons">
      <button @click="showAddItem = !showAddItem">
        {{ showAddItem ? 'Skjul input' : 'Legg til vare' }}
      </button>

      <button class="squareButton toggleAdd" @click="theSwitch">
        Switch
      </button>
    </div>

    <AddItem
        v-if="showAddItem"
        @add="addItem"
        @store-change="setActiveStore"
    />

    <TheList
        :list="activeList"
        :compactView="compactView"
        @delete="deleteItem"
        @toggle-checked="toggleChecked"
        @set-priority="setPriority"
        :showAddItem="showAddItem"
    />
  </div>
</template>

<style>
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 100%;
}

.topButtons button {
  width: 190px;
  height: 30px;
  box-shadow: #283a3c 1.5px 1.5px;
  margin: 5px 0 10px 10px;
}

.topButtons button:active {
  background-color: rgba(142, 148, 149, .5);
  transform: scale(0.97);
  box-shadow: #283a3c 0 0;
  border: #d6dde3 1px solid;
}

.app {
  min-height: 100svh;
  background: #eaf2f8;
}
</style>
