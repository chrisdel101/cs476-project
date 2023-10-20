import Item from "./Item"

export interface ObserverInterface {
    update: (items: Item[]) => void
    id: string
  }

  class Observer implements ObserverInterface {

    id: string
    update: (items: Item[]) => void

    constructor({id, update}: ObserverInterface) {
        this.id = id
        this.update = update
    }
  }

  export default Observer;