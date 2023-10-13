
import { ItemStates, UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import User from '../../models/abstractClasses/User'
import Item from '../../models/Item'


// set pending item to dondated state
export const handleAcceptItem = (item: Item, currentUser?: User|null) => {
    if(!currentUser) return
    if(currentUser.userType === UserTypes.RECEIVER) return
    // confirm item is pending
    if(item.itemState === ItemStates.PENDING) {
        // change item state - these don't do anytting :(
       item.setItemState = ItemStates.DONATED
       item.setDonatedAtTimeStamp = Date.now()
    // update item in db
    crudFunctions.updateEntireItem(item)
    } else {
        console.error('Item is not in pending state')
    }
}
// set pending item back to availanle state
export const handleRejectItem = (item: Item, currentUser?: User|null) => {
    if(!currentUser) return
    if(currentUser.userType === UserTypes.RECEIVER) return
    // confirm item is pending
    if(item.itemState === ItemStates.PENDING) {
        // change item state - these don't do anytting :(
       item.setItemState = ItemStates.AVAILABLE
       item.setReceiverId = null
    // update item in db
    crudFunctions.updateEntireItem(item)
    } else {
        console.error('Item is not available')
    }
}
// set donated item back to claimed state
export const handleClaimItem = (item: Item, currentUser?: User|null) => {
    if(!currentUser) return
    if(currentUser.userType === UserTypes.RECEIVER) return
    // confirm item is available
    if(item.itemState === ItemStates.DONATED) {

    // update item in db
    crudFunctions.updateItem(item, 'itemState', ItemStates.CLAIMED)
    } else {
        console.error('Item is not available')
    }
}
export const handleCancelRequest = (item: Item, currentUser?: User|null) => {
    if(!currentUser) return
    if(currentUser.userType === UserTypes.RECEIVER) return
        // change item state
       item.setItemState = ItemStates.AVAILABLE
       item.setReceiverId = null
    // update item in db
    crudFunctions.updateEntireItem(item)
}