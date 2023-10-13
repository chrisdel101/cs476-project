import { ItemStates, ItemTypes } from '../../constants.ts';
export interface ItemInterface {
    id?: string | null
    name: string
    description: string
    location: string;
    itemType: ItemTypes
    itemState?: ItemStates
    donorId: string
    receiverId?: string | null
    addedAtTimeStamp: number
    donatedAtTimeStamp?: number

}

class Item implements ItemInterface{
    id?: string | null
    name: string;
    description: string;
    location: string;
    itemType: ItemTypes;
    itemState?: ItemStates
    donorId: string
    receiverId?: string | null
    addedAtTimeStamp: number
    donatedAtTimeStamp?: number
    constructor({id, name, description, location, itemType, donorId, receiverId, itemState}: ItemInterface) {
        // might not need this
        this.id = id || null;
        this.name = name;
        this.description = description;
        this.location = location;
        this.itemType = itemType;
        this.donorId = donorId;
        this.itemState = itemState || ItemStates.AVAILABLE
        // must be null to show up in FB
        this.receiverId = receiverId || null
        this.addedAtTimeStamp = Date.now()
        
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
    set setDonatedAtTimeStamp(timeStamp: number){
        this.donatedAtTimeStamp = timeStamp
    }
}
export default Item;
