<script setup lang="ts">
import { computed, ref , watch} from 'vue'


interface Item {
  id: number
  name: string
  quantity: number
  price: number
  checked: boolean
  priority: boolean
  editing: boolean
  store: string | null
}


const props = defineProps<{
  items: Item[]
  activeStore: string
  compactView: boolean
  priorityTotal: number
  grandTotal: number
  showAddItem: boolean
}>()


const emit = defineEmits(['delete', 'toggle-checked'])


function itemTotal(item: Item) {
  return item.quantity * item.price
}

function editItem(item: Item) {
  item.editing = true
}

function saveItem(item: Item) {
  item.editing = false
}


const sortedItems = computed(() => {
  let list = props.items

  if (props.activeStore !== 'all') {
    list = list.filter(i =>
        !i.checked &&
        (i.store === null || i.store === props.activeStore)
    )
  }

  if (props.items.some(i => i.editing)) return list

  return [...list].sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? 1 : -1
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'no')
  })
})


function searchItemDeal(item: Item) {
  const q = encodeURIComponent(item.name)
  window.open(`https://www.tilbudsuken.no/tilbud/${q}`, '_blank')
}

</script>

<template>


  <div class="theList">
    <table>
        <thead>
        <tr>
          <th class="col-ant">Ant</th>
          <th class="col-vare">Vare</th>

          <template v-if="!compactView">
            <th class="col-small">Pris pr</th>
            <th class="col-small">Tot</th>
            <th class="col-mid">Pri</th>
            <th class="col-mid">Varer som mangler</th>
          </template>

          <template v-else>
            <th class="col-small">Tilbud</th>
            <th class="col-small">Rediger</th>
            <th class="col-small">Butikk</th>
            <th class="col-small">Slett</th>
          </template>
        </tr>
        </thead>

        <tbody>
        <tr v-for="item in sortedItems" :key="item.id">

          <!-- Antall -->
          <td>
            <span v-if="!item.editing">{{ item.quantity }}</span>
            <input v-else type="number" v-model.number="item.quantity" />
          </td>

          <!-- Vare -->
          <td>
            <span v-if="!item.editing">{{ item.name }}</span>
            <input v-else v-model="item.name" />
          </td>

          <!-- MODE A -->
          <template v-if="!compactView">


          <!-- Pris -->
            <td>
              <span v-if="!item.editing">{{ item.price }} kr</span>
              <input v-else type="number" v-model.number="item.price" />
            </td>

            <!-- Total -->
            <td>{{ itemTotal(item) }} kr</td>

            <!-- Prioritet -->
            <td class="priCheck">
              <input type="checkbox" v-model="item.priority" />
            </td>

            <!-- Kjøpt -->
            <td class="buyCheck">
              <input
                  type="checkbox"
                  :checked="item.checked"
                  @change="emit('toggle-checked', item.id)"
              />
            </td>

          </template>

          <!-- MODE B -->
          <template v-else>

            <!-- Søk -->
            <td>
              <button @click="searchItemDeal(item)">🔍</button>
            </td>

            <!-- Rediger -->
            <td>
              <button v-if="!item.editing" @click="editItem(item)">R</button>
              <button v-else @click="saveItem(item)">Lagre</button>
            </td>

            <!-- Butikk -->
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

            <!-- Slett -->
            <td>
              <button @click="emit('delete', item.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg></button>
            </td>

          </template>

        </tr>
        </tbody>


        <tfoot>

        </tfoot>
      </table>
    </div>

  <table class="theTotals">
    <tr >
      <td class="prisum">Prioritert totalsum:</td>
      <td class="prisum">{{ priorityTotal }} kr</td>
    </tr>

    <tr>
      <td class="sum">Totalsum:</td>
      <td class="sum">{{ grandTotal }} kr</td>
    </tr>
  </table>
</template>

<style scoped>
/* Wrapper */
div {
  padding: 0.01rem;
  background: #eaf2f8;
  overflow-x: auto;
}

.toggleBar {
  display: flex;
  height: 50px
}

.toggleAdd {
  background-color: #236277;
  margin: 6px;
  width: 50%;
}


.priCheck input,
.buyCheck input {
  display: block;
  margin: 0 auto;
}



.theTotals{
  position: sticky;
  margin: 20px 0 0 .1%;
}

.theTotals td {
  height: 30px;
  width: 50%;
}


.theList {
  overflow-y: auto;
  height: 43vh;
  border: solid 2px #236277;
  border-radius: 2px;
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
  font-family: Arial;
  font-size: 16px;
  height: 34px;
  padding: 0.4rem;
  border: 1px solid #070707;
  word-wrap: break-word;
  vertical-align: middle;
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
