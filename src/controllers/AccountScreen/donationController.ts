
import { ItemStates, UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import User from '../../models/abstractClasses/User'
import Item from '../../models/Item'


// set pending item to dondated state - allow reciever to have item
export const handleAcceptItem = (item: Item, currentUser?: User|null) => {
    if(!currentUser) return
    if(currentUser.userType === UserTypes.RECEIVER) return
    // confirm item is pending
    if(item.itemState === ItemStates.PENDING) {
        // change item state - these don't do anytting :(
            item.setItemState = ItemStates.DONATED
            item.setDonatedAtTimeStamp = Date.now()
            // update item in db
            // TODO confirm user and item are matched pre-crud
            crudFunctions.updateEntireItem(item)
    } else {
        console.error('Item is not in pending state')
    }
}
// set pending item back to availanle state - reset item back into item pool
export const handleRejectItem = (item: Item, currentUser?: User|null) => {
    if(!currentUser) return
    if(currentUser.userType === UserTypes.RECEIVER) return
    // confirm item is pending
    if(item.itemState === ItemStates.PENDING) {
    // TODO confirm user and item are matched pre-crud
        handleCancelRequest(item, currentUser)
    } else {
        console.error('Item is not available')
    }
}
// set donated item to claimed state - after user has picked up item 
export const handleClaimItem = (item: Item, currentUser?: User|null) => {
    if(!currentUser) return
    if(currentUser.userType === UserTypes.RECEIVER) return
    // confirm item is available
    if(item.itemState === ItemStates.DONATED) {

    // update item in db
    // TODO confirm user and item are matched pre-crud
    crudFunctions.updateItem(item, 'itemState', ItemStates.CLAIMED)
    } else {
        console.error('Item is not available')
    }
}
// same as reject request but without any conditions
// both users can call it
export const handleCancelRequest = (item: Item, currentUser?: User|null) => {
    if(!currentUser) return
        // reset item states to available
       item.setItemState = ItemStates.AVAILABLE
       item.setReceiverId = null
       item.setDonatedAtTimeStamp = null
 // TODO confirm user and item are matched pre-crud      
    // update item in db
    crudFunctions.updateEntireItem(item)
}
// delete the item from the DB - this is bad practice & should just deactivate to keep history - but this is a quick fix 
export const handleDeleteDonation = (item: Item, currentUser?: User|null) => {
    if(!currentUser || currentUser.userType === UserTypes.RECEIVER) return
    // TODO confirm user and item are matched pre-crud
    crudFunctions.deleteItem(item)
    // TODO send confirmation 
}
export const handleUpdateDonation = (item: Item, currentUser?: User|null) => {
    if(!currentUser || currentUser.userType === UserTypes.RECEIVER) return
    
}