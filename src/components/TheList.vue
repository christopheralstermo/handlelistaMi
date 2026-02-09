<script setup lang="ts">
import type { ShoppingList} from "@/model/ShoppingList.ts";

const props = defineProps<{
  list: ShoppingList
  compactView: boolean
  showAddItem: boolean
}>()

const emit = defineEmits(['delete', 'toggle-checked', 'set-priority'])


function searchItemDeal(item: any) {
  const q = encodeURIComponent(item.name)
  window.open(`https://www.tilbudsuken.no/tilbud/${q}`, '_blank')
}
</script>

<template>

  <div :class="['theList', { expanded: !showAddItem }]">

  <table>
      <thead>
      <tr>
        <th class="col-ant">Ant</th>
        <th class="col-vare">Vare</th>

        <template v-if="!compactView">
          <th class="col-small">Pris pr</th>
          <th class="col-small">Tot</th>
          <th class="col-mid">Prioritet</th>
          <th class="col-mid">Trenger</th>
        </template>

        <template v-else>
          <th class="col-small">Pris pr</th>
          <th class="col-small">Tilbud</th>
          <th class="col-small">Rediger</th>
          <th class="col-small">Butikk</th>
          <th class="col-small">Slett</th>
        </template>
      </tr>
      </thead>

      <tbody>
      <tr v-for="item in list.sortedItems" :key="item.id">

        <td>
          <span v-if="!item.editing">{{ item.quantity }}</span>
          <input v-else type="number" v-model.number="item.quantity" />
        </td>

        <td>
          <span v-if="!item.editing">{{ item.name }}</span>
          <input v-else v-model="item.name" />
        </td>


          <td>
            <span v-if="!item.editing">{{ item.price }} kr</span>
            <input v-else type="number" v-model.number="item.price" />
          </td>

          <template v-if="!compactView">

          <td>{{ item.quantity * item.price }} kr</td>

          <td class="priCheck">
            <input
                type="checkbox"
                :checked="item.priority"
                @change="emit('set-priority', { id: item.id, value: !item.priority })"
            />

          </td>

          <td class="buyCheck">
            <input
                type="checkbox"
                :checked="!item.checked"
                @change="emit('toggle-checked', item.id)"
            />
          </td>

        </template>

        <template v-else>

          <td>
            <button @click="searchItemDeal(item)">🔍</button>
          </td>

          <td>
            <button v-if="!item.editing" @click="item.editing = true">R</button>
            <button v-else @click="item.editing = false">Lagre</button>
          </td>

          <td>
            <select v-model="item.store" class="storeSelect">
              <option :value="null">–</option>
              <option value="rema">Rema</option>
              <option value="kiwi">Kiwi</option>
              <option value="meny">Meny</option>
              <option value="extra">Extra</option>
              <option value="coop">Coop Obs</option>
            </select>
          </td>

          <td>
            <button @click="emit('delete', item.id)">X</button>
          </td>

        </template>

      </tr>
      </tbody>
    </table>
  </div>

  <table class="theTotals">
    <tbody>
    <tr>
      <td class="prisum">Prioritert totalsum:</td>
      <td class="prisum">{{ list.priorityTotal }} kr</td>
    </tr>

    <tr>
      <td class="sum">Totalsum:</td>
      <td class="sum">{{ list.grandTotal }} kr</td>
    </tr>
    </tbody>
  </table>

</template>

<style scoped>
/* Wrapper */
div {
  padding: 0.01rem;
  background: #eaf2f8;
  overflow-x: auto;
}

/* Chrome, Edge, Safari */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}



.priCheck input,
.buyCheck input {
  display: block;
  margin: 0 auto;
}

.storeSelect {
  appearance: none;
  -webkit-appearance: none;
  min-width: 0 !important;
  width: 40px !important;
}



.theTotals{
  min-width: unset;
  width: 98%;
  margin: 20px 0 0 1%;
  box-shadow: #0f1f23 1.5px 1.5px 1.5px;
}


.theTotals td {
  height: 30px;
  width: 50%;
  font-size: 22px;
}


.theList {
  overflow-y: auto;
  height: 43vh;
  border-left:  solid 1px #1c4b5a;
  border-bottom: solid 1px #1c4b5a;
  border-radius: 2px;
}

.theList td input[type="number"] {
  box-sizing: border-box;
  max-width: 100%;
}
.theList td input {
  box-sizing: border-box;
  max-width: 70%;
}

.theList table {
  table-layout: fixed;
  width: 100%;
}


.theList.expanded {
  height: 73vh;
}

.prisum {
  background-color: #bef6ff;
}

.sum {
  background-color: #bcd9e3;
}

.col-ant {
  width: 33px;
}

.col-vare {
  width: 120px;
}

.col-small {
  width: 50px;
}

.col-mid {
  width: 55px;
}

.storeSelect {
  width: 50px;
}


table {
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

/* Header */
thead {
  background: #f3e6d8;
}


td,
th {
  white-space: normal;
  word-break: break-word;
}


th {
  padding: 0;
  border: 1px solid #136142;
  text-align: center;
  word-wrap: break-word;
  height: 54px;
}

/* Cells */
td {
  font-family: Arial, Helvetica, sans-serif;
  height: 34px;
  padding: 0.4rem;
  border: 1px solid #070707;
  word-wrap: break-word;
  vertical-align: middle;
}

.theList td {
  font-size: 17px;
}

/* Zebra rows */
tbody tr:nth-child(even) {
  background: #eefafa;
}

tbody tr:nth-child(odd) {
  background: #bcd9e3;
}

/* Footer */
tfoot {
  background: #f3e6d8;
  font-weight: bold;
}

tfoot td {
  padding: 0.75rem 0.5rem;
  border-top: 2px solid #d8b98c;
}

/* Buttons */
button {
  width: 100%;
  padding: 0.3rem 0.4rem;
  font-size: 0.85rem;
  border: none;
  background: #d56c48;
  color: #ffffff;
  border-radius: 4px;
  border: solid rgba(19, 97, 66, 0.75) 1.4px;
}

td button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}


/* Checkboxes */
input[type="checkbox"] {
  transform: scale(1.3);
}

/* Smal siste kolonne (Slett) */
td:last-child,
th:last-child {
  width: 3rem;
}

/* Prevent horizontal scroll*/
th,
td {
  overflow-wrap: break-word;
}


</style>
