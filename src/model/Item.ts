export class Item {
    id: number
    name: string
    quantity: number
    price: number
    checked = false
    priority = false
    editing = false
    store: string | null = null

    constructor(id: number, name: string, quantity: number, price: number) {
        this.id = id
        this.name = name
        this.quantity = quantity
        this.price = price
    }

}
