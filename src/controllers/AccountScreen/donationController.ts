import {
  ItemStates,
  Notifications,
  Observers,
  UserTypes,
} from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import User from '../../models/abstractClasses/User'
import Item from '../../models/Item'

interface FProps {
  item: Item
  notify: (
    observerID: string,
    notificationType: Notifications,
    user: User
  ) => void
  currentUser?: User | null
}
// set pending item to dondated state - allow reciever to have item
export const handleAcceptItem = ({item, notify, currentUser}: FProps
) => {
  if (!currentUser) return
  if (currentUser.userType === UserTypes.RECEIVER) return
  // confirm item is pending
  if (item.itemState === ItemStates.PENDING) {
    // change item state - these don't do anytting :(
    item.setItemState = ItemStates.DONATED
    item.setDonatedAtTimeStamp = Date.now()
    // update item in db
    // TODO confirm user and item are matched pre-crud
    crudFunctions.updateEntireItem(item)
    // call nofity to update page
    notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
  } else {
    console.error('Item is not in pending state')
  }
}
// set pending item back to availanle state - reset item back into item pool
export const handleRejectItem = ({item, notify, currentUser}: FProps
  ) => {
  if (!currentUser) return
  if (currentUser.userType === UserTypes.RECEIVER) return
  // confirm item is pending
  if (item.itemState === ItemStates.PENDING) {
    // TODO confirm user and item are matched pre-crud
    handleCancelRequest(item, currentUser)
     // call nofity to update page
     notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
  } else {
    console.error('Item is not available')
  }
}
// set donated item to claimed state - after user has picked up item
export const handleClaimItem = ({item, notify, currentUser}: FProps) => {
  if (!currentUser) return
  if (currentUser.userType === UserTypes.RECEIVER) return
  // confirm item is available
  if (item.itemState === ItemStates.DONATED) {
    // update item in db
    // TODO confirm user and item are matched pre-crud
    crudFunctions.updateItem(item, 'itemState', ItemStates.CLAIMED)
    notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
  } else {
    console.error('Item is not available')
  }
}
// same as reject request but without any conditions
// both users can call it
export const handleCancelRequest = ({item, notify, currentUser}: FProps) => {
  if (!currentUser) return
  // reset item states to available
  item.setItemState = ItemStates.AVAILABLE
  item.setReceiverId = null
  item.setDonatedAtTimeStamp = null
  // TODO confirm user and item are matched pre-crud
  // update item in db
  crudFunctions.updateEntireItem(item)
  notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
}
// delete the item from the DB - this is bad practice & should just deactivate to keep history - but this is a quick fix
export const handleDeleteDonation = ({item, notify, currentUser}: FProps) => {
  if (!currentUser || currentUser.userType === UserTypes.RECEIVER) return
  // TODO confirm user and item are matched pre-crud
  crudFunctions.deleteItem(item)
  notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
  // TODO send confirmation
}
