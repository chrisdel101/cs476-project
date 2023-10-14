
import { ItemStates, UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import User from '../../models/abstractClasses/User'
import Item from '../../models/Item'

export const handleRequestItem = (currentUser: User, item: Item) => {
    if(currentUser.userType === UserTypes.DONOR) return
    // confirm item is available
    if(item.itemState === ItemStates.AVAILABLE) {
        // change item state
       item.setItemState = ItemStates.PENDING
       item.setReceiverId = currentUser.id as string
    // update item in db
    crudFunctions.updateEntireItem(item)
    } else {
        console.error('Item is not available')
    }
}