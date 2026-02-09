
import { Item } from '@/model/Item'

export class ShoppingList {
    id: number
    name: string
    items: Item[] = []
    activeStore: string = 'all'


    constructor(id: number, name: string, items: Item[] = []) {
        this.id = id
        this.name = name
        this.items = items
    }

    static fromJSON(data: any) {
        return new ShoppingList(
            data.id,
            data.name,
            data.items.map((i: any) => {
                const item = new Item(i.id, i.name, i.quantity, i.price)
                item.checked = i.checked
                item.priority = i.priority
                item.store = i.store
                item.editing = false
                return item
            })
        )
    }



    addItem(item: Item) {
        this.items.push(item)
    }

    deleteItem(id: number) {
        this.items = this.items.filter(i => i.id !== id)
    }

    toggleChecked(id: number) {
        const item = this.items.find(i => i.id === id)
        if (!item) return

        item.checked = !item.checked

        if (item.checked) {
            item.priority = false
            item.store = null
        }
    }

    setActiveStore(store: string) {
        this.activeStore = store
    }


    setPriority(id: number, value: boolean) {
        const item = this.items.find(i => i.id === id)
        if (item) item.priority = value
    }

    get grandTotal() {
        return this.items
            .filter(i => !i.checked)
            .reduce((s, i) => s + i.price * i.quantity, 0)
    }

    get priorityTotal() {
        return this.items
            .filter(i => i.priority && !i.checked)
            .reduce((s, i) => s + i.price * i.quantity, 0)
    }

    get sortedItems() {
        let list = [...this.items]

        if (this.activeStore !== 'all') {
            list = list.filter(i =>
                !i.checked &&
                (i.store === null || i.store === this.activeStore)
            )
        }

        return list.sort((a, b) => {
            if (a.checked !== b.checked) return a.checked ? 1 : -1
            return a.name.localeCompare(b.name, 'no')
        })
    }

}
