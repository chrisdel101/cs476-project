import { ItemTypes } from '../../constants.ts';
interface ItemInterface {
    id?: string
    name: string
    description: string
    location: string;
    itemType: ItemTypes
    donorId: string
    receiverId?: string
}

class Item implements ItemInterface{
    id?: string;
    name: string;
    description: string;
    location: string;
    itemType: ItemTypes;
    isAvailable: boolean
    donorId: string
    receiverId?: string
    constructor({name, description, location, itemType, donorId}: ItemInterface) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.itemType = itemType;
        this.isAvailable = true;
        this.donorId = donorId;
    }
    // SETTERS
    set setIsAvailable(isAvailable: boolean){
        this.isAvailable = isAvailable
    }
    set setReceiverId(recvId: string){
        this.receiverId = recvId
    }
    set setItemId(itemId: string){
        this.id = itemId
    }
}
export default Item;
