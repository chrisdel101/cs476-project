import { ItemTypes } from '../../constants.ts';

interface ItemInterface {
    name: string
    description: string
    location: string;
    itemType: ItemTypes
}

class Item {
    name: string;
    description: string;
    location: string;
    itemType: ItemTypes;

    constructor({name, description, location, itemType}: ItemInterface) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.itemType = itemType;
    }
}
export default Item;
