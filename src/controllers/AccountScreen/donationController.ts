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
    user?: User
  ) => void
  currentUser?: User | null
  setSuccessMsg: (str: string|undefined) => void;
  setErrorMsg: (str: string|undefined) => void;
}
// set pending item to dondated state - allow reciever to have item
export const handleAcceptItem = ({item, notify, currentUser, setErrorMsg, setSuccessMsg}: FProps
) => {
  if (!currentUser) return
  if (currentUser.userType === UserTypes.RECEIVER) return
  // confirm item is pending
  if (item.itemState === ItemStates.PENDING) {
    item.setItemState = ItemStates.DONATED
    item.setDonatedAtTimeStamp = Date.now()
    item.setChanged = true
    crudFunctions.updateEntireItem(item)  // update item in db
    // TODO confirm user and item are matched pre-crud
    // call nofity to update page
    notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
    notify(Observers.NAV, Notifications.GET_ITEMS_BY_USER, currentUser)
    setSuccessMsg('Item has been successfully approved. Receiver will be notified.')
  } else {
    console.error('Item is not in pending state')
    setErrorMsg('An error occured during item approval')
  }
}
// set pending item back to availanle state - reset item back into item pool
export const handleRejectItem = ({item, notify, currentUser, setErrorMsg, setSuccessMsg}: FProps
  ) => {
  if (!currentUser) return
  if (currentUser.userType === UserTypes.RECEIVER) return
  // confirm item is pending
  if (item.itemState === ItemStates.PENDING) {
    // TODO confirm user and item are matched pre-crud
    handleCancelRequest({item, notify, currentUser, setErrorMsg, setSuccessMsg})
    // call nofity to update page
     notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
    notify(Observers.NAV, Notifications.GET_ITEMS)
    setSuccessMsg('Item has been successfully rejected. Item wil return to the item pool.')
  } else {
    console.error('Item is not available')
    setErrorMsg('An error occured during item rejection')
  }
}
// set donated item to claimed state - after user has picked up item
export const handleClaimItem = ({item, notify, currentUser, setErrorMsg, setSuccessMsg}: FProps) => {
  if (!currentUser) return
  if (currentUser.userType === UserTypes.RECEIVER) return
  // confirm item is available
  if (item.itemState === ItemStates.DONATED) {
    // update item in db
    // TODO confirm user and item are matched pre-crud
    crudFunctions.updateItem(item, 'itemState', ItemStates.CLAIMED)
    notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
    notify(Observers.NAV, Notifications.GET_ITEMS_BY_USER, currentUser)
    setSuccessMsg('Item has been successfully claimed. This item will now be removed from the system.')
  } else {
    console.error('Item is not available')
    setErrorMsg('An error occured during item claim.')
  }
}
// same as reject request but without any conditions
// both users can call it
export const handleCancelRequest = ({item, notify, currentUser, setErrorMsg, setSuccessMsg}: FProps) => {
  if (!currentUser) return
  // reset item states to available
  item.setItemState = ItemStates.AVAILABLE
  item.setReceiverId = null
  item.setDonatedAtTimeStamp = null
  // set item state back from true back to false
  item.setChanged = false
  // TODO confirm user and item are matched pre-crud
  // update item in db
  crudFunctions.updateEntireItem(item)
  notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
  notify(Observers.NAV, Notifications.GET_ITEMS_BY_USER, currentUser)
  setSuccessMsg('Item request has been successfully cancelled. This item will return to the item pool.')
}
// delete the item from the DB - this is bad practice & should just deactivate to keep history - but this is a quick fix
export const handleDeleteDonation = ({item, notify, currentUser, setErrorMsg, setSuccessMsg}: FProps) => {
  if (!currentUser || currentUser.userType === UserTypes.RECEIVER) return
  // TODO confirm user and item are matched pre-crud
  crudFunctions.deleteItem(item)
  notify(Observers.ACCOUNT, Notifications.GET_ITEMS_BY_USER, currentUser)
  notify(Observers.NAV, Notifications.GET_ITEMS_BY_USER, currentUser)
  setSuccessMsg('Item request has been successfully deleted.')
  // TODO send confirmation
}
