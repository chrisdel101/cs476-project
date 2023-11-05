import { FunctionStatus, Notifications, Observers, UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import Item, { ItemInterface } from '../../models/Item'
import User from '../../models/abstractClasses/User'

interface IHandleSubmit {
  e: React.FormEvent<HTMLFormElement>
  setValidated: (bool: boolean) => void
  handleCloseAddItemModal: (bool: boolean) => void
  setErrorMsg: (str: string | undefined) => void
  setSuccessMsg: (str: string | undefined) => void
  currentUser?: User |null
  item?: Item
  observerID: Observers
  notify: (observerID: Observers, notificationType: Notifications, user?: User) => void
  notifcationType: Notifications
  imageFile: File | undefined
}

export const handleSubmit = async ({
  e,
  setValidated,
  handleCloseAddItemModal,
  setSuccessMsg,
  setErrorMsg,
  currentUser, 
  item,
  notify,
  observerID,
  notifcationType,
  imageFile
}: IHandleSubmit) => {
  // stop default submission
  e.preventDefault()

  // check user it a Donor else return
    if (!currentUser || currentUser?.userType !== UserTypes.DONOR) {
        console.error('User is not a Donor. Item form should not be visible')
        return
    }
  // get item data from form
  const form = e?.currentTarget

  // get user data from form
  const name = form['item-name']?.value
  const description = form?.description?.value
  const location = form?.location?.value
  const pickupAddress = form['pickup-address']?.value;  
  const category = form?.category?.value
  const image_file = imageFile;
  let image = "default"
  if (imageFile) {
    image = imageFile.name;
  } 

  // handle required fields validation
  if (form.checkValidity() === false) {
    setValidated(true)
    return
  }
  const newItem = (item ? 
  // update item
  {
    ...item,
    name,
    description,
    location,
    itemType: category,
    pickupAddress,
    changed: false,
    image
  } :
  {
    name,
    description,
    location,
    itemType: category,
    donorId: currentUser.id,
    pickupAddress,
    changed: false,
    image
  }) as ItemInterface
  
  // if !item add item to db
  //  if item, update item
  const response =  item ? await crudFunctions.updateEntireItem(new Item(newItem)) : await crudFunctions.addNewItem(new Item(newItem), image_file)
  if(!response) {
    setErrorMsg(`Error: Item ID is missing. Cannot call DB function`)
    return
  } else if (response?.status === FunctionStatus.ERROR) {
    console.log(`Error in addItem submit ${response.errorMessage}`)
    setErrorMsg(`Error adding Item: ${response.errorMessage}`)
    return
  }
   
  //  call notify using index observer id
  notify(observerID, notifcationType, currentUser)
  // close modal  
  handleCloseAddItemModal(true)
  // set msg
  setSuccessMsg(`Item Successfully Created`)
}

