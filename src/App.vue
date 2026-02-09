<script setup lang="ts">
import TheList from "@/components/TheList.vue";
import AddItem from "@/components/AddItem.vue";
import { ref } from "vue";
import {useLogic} from "@/composables/Logic.ts";

const activeStore = ref('all')
const showAddItem = ref(true)

const {
  items,
  compactView,
  toggleChecked,
  grandTotal,
  priorityTotal,
  addItem,
  theSwitch,
  deleteItem
} = useLogic()


</script>

<template>
  <div class="app">

    <button @click="showAddItem = !showAddItem">
      {{ showAddItem ? 'Skjul input' : 'Legg til vare' }}
    </button>

    <button class="squareButton toggleAdd" @click="theSwitch">
      Switch
    </button>

    <AddItem
        v-if="showAddItem"
        @add="addItem"
        @store-change="activeStore = $event"
    />

    <TheList
        :items="items"
        :activeStore="activeStore"
        :compactView="compactView"
        :priorityTotal="priorityTotal"
        :grandTotal="grandTotal"
        :showAddItem="showAddItem"
        @delete="deleteItem"
        @toggle-checked="toggleChecked"
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

.app {
  min-height: 100svh;
  background: #eaf2f8;
}
</style>
