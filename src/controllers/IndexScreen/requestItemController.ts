
import { ItemStates, Notifications, Observers, UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import User from '../../models/abstractClasses/User'
import Item from '../../models/Item'
import {
  collection,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../services/firebase.config'
import { Collections } from '../../../constants'

// Note that the workaround changes this to be an async function because it has to get data
// from the database
interface FProps {
    currentUser: User | null
    item: Item
    notify: (
      observerID: string,
      notificationType: Notifications,
      user?: User | null
    ) => void
    setErrorMsg: (msg: string) => void
    setSuccessMsg: (msg: string) => void
  }
export const handleRequestItem = async ({currentUser, item, notify, setSuccessMsg, setErrorMsg}: FProps) => {
    if(currentUser?.userType === UserTypes.DONOR) return
    // confirm item is available
    const querySnapshot_temp = await getDocs(collection(db, Collections.ITEMS));
    const matchingItem_temp = querySnapshot_temp.docs.find(doc => doc.id === item.id && doc.data().itemState === item.itemState);
    if(item.itemState === ItemStates.AVAILABLE && matchingItem_temp) {
        // change item state
       item.setItemState = ItemStates.PENDING
       item.setReceiverId = currentUser?.id as string
       //  call notify to refresh index page
        notify(Observers.INDEX, Notifications.GET_ITEMS)
        notify(Observers.NAV, Notifications.GET_ITEMS)
    // update item in db
    crudFunctions.updateEntireItem(item)
    setSuccessMsg("Your request was a success. Once the donor approves it you will be notified & given their pickup address.")
    } else {
        console.error('Item is not available')
        setErrorMsg("An error occured or this item is not available")
    }
}