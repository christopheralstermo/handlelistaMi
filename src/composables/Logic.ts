import { ref, computed, watch } from "vue"
import { defaultItems } from "@/defaultItems"

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

export function useLogic() {

    const items = ref<Item[]>([])
    const compactView = ref(false)

    // ---------- LOCAL STORAGE START ----------
    const saved = localStorage.getItem('shopping-list-v1')

    if (saved) {
        items.value = JSON.parse(saved)
    } else {
        items.value = defaultItems.map((item, index) => ({
            id: index,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            checked: false,
            priority: false,
            editing: false,
            store: null
        }))
    }

    let idCounter = items.value.length
    // ---------- LOCAL STORAGE END ----------

    function toggleChecked(id: number) {
        const item = items.value.find(i => i.id === id)
        if (!item) return

        item.checked = !item.checked

        if (item.checked) {
            item.priority = false
            item.store = null
        }
    }

    const grandTotal = computed(() => {
        return items.value
            .filter(i => !i.checked)
            .reduce((sum, i) => sum + itemTotal(i), 0)
    })

    const priorityTotal = computed(() => {
        return items.value
            .filter(i => i.priority && !i.checked)
            .reduce((sum, i) => sum + itemTotal(i), 0)
    })

    function addItem(item: { name: string; quantity: number; price: number }) {
        items.value.push({
            id: idCounter++,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            checked: false,
            priority: false,
            editing: false,
            store: null
        })
    }

    function theSwitch() {
        compactView.value = !compactView.value
    }

    function itemTotal(item: Item) {
        return item.quantity * item.price
    }

    function deleteItem(id: number) {
        items.value = items.value.filter(item => item.id !== id)
    }

    watch(
        items,
        (newItems) => {
            localStorage.setItem('shopping-list-v1', JSON.stringify(newItems))
        },
        { deep: true }
    )

    return {
        items,
        compactView,
        toggleChecked,
        grandTotal,
        priorityTotal,
        addItem,
        theSwitch,
        deleteItem
    }
}
