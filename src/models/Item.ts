import { ItemStates, ItemTypes } from '../../constants.ts';
export interface ItemInterface {
    id?: string | null;
    name: string;
    description: string;
    location: string;
    pickupAddress: string;
    itemType: ItemTypes;
    itemState?: ItemStates;
    donorId: string;
    receiverId?: string | null;
    addedAtTimeStamp?: number;
    donatedAtTimeStamp?: number | null;
    changed: boolean;
    image?: string;
}

class Item implements ItemInterface{
    id?: string | null;
    name: string;
    description: string;
    location: string;
    pickupAddress: string;
    itemType: ItemTypes;
    itemState?: ItemStates;
    donorId: string;
    receiverId?: string | null;
    addedAtTimeStamp?: number;
    donatedAtTimeStamp?: number | null;
    changed: boolean;
    image?: string;
    constructor({id, name, description, location, itemType, donorId, receiverId, itemState, addedAtTimeStamp, donatedAtTimeStamp, pickupAddress, changed, image}: ItemInterface) {
        // might not need this
        this.id = id || null;
        this.name = name;
        this.description = description;
        this.location = location;
        this.itemType = itemType;
        this.donorId = donorId;
        this.itemState = itemState || ItemStates.AVAILABLE;
        // m.donatedAtTimeStamp
        this.receiverId = receiverId || null;
        this.addedAtTimeStamp = addedAtTimeStamp || Date.now();
        this.donatedAtTimeStamp = donatedAtTimeStamp || undefined;
        this.pickupAddress = pickupAddress;
        this.changed = changed || false;
        this.image = image;
    }
    // SETTERS
    set setItemState(newState: ItemStates){
        this.itemState = newState
    }
    set setReceiverId(recvId: string|null){
        this.receiverId = recvId
    }
    set setItemId(itemId: string){
        this.id = itemId
    }
    set setDonatedAtTimeStamp(timeStamp: number | null){
        this.donatedAtTimeStamp = timeStamp
    }
    set setChanged(change: boolean){
        this.changed = change
    }
}
export default Item;
