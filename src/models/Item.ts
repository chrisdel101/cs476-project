import { ItemStates, ItemTypes } from '../../constants.ts';
export interface ItemInterface {
    id?: string
    name: string
    description: string
    location: string;
    itemType: ItemTypes
    itemState?: ItemStates
    donorId: string
    receiverId?: string
}

class Item implements ItemInterface{
    id?: string;
    name: string;
    description: string;
    location: string;
    itemType: ItemTypes;
    itemState?: ItemStates
    donorId: string
    receiverId?: string
    constructor({name, description, location, itemType, donorId, itemState}: ItemInterface) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.itemType = itemType;
        this.donorId = donorId;
        this.itemState = itemState || ItemStates.AVAILABLE
    }
    // SETTERS
    set setItemState(newState: ItemStates){
        this.itemState = newState
    }
    set setReceiverId(recvId: string){
        this.receiverId = recvId
    }
    set setItemId(itemId: string){
        this.id = itemId
    }
}
export default Item;
