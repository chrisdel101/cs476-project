import { FunctionStatus, ItemTypes, UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import Item from '../../models/Item'
import User from '../../models/abstractClasses/User'

interface IHandleSubmit {
  e: React.FormEvent<HTMLFormElement>
  setValidated: (bool: boolean) => void
  handleCloseAddItemModal: (bool: boolean) => void
  setErrorMsg: (str: string | undefined) => void
  setSuccessMsg: (str: string | undefined) => void
  currentUser?: User |null
}

export const handleSubmit = async ({
  e,
  setValidated,
  handleCloseAddItemModal,
  setSuccessMsg,
  setErrorMsg,
  currentUser
}: IHandleSubmit) => {
  // stop default submission
  e.preventDefault()

//   check user it a Donor else return
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
  const category = form?.category?.value

  // handle required fields validation
  if (form.checkValidity() === false) {
    setValidated(true)
    return
  }
  const item = new Item({
    name,
    description,
    location,
    itemType: category as ItemTypes,
    donorId: currentUser?.id as string
  })
   // add item to db
   const response =  await crudFunctions.addNewItem(item)
   if (response.status === FunctionStatus.ERROR) {
    console.log(`Error in addItem submit ${response.errorMessage}`)
    setErrorMsg(`Error adding Item: ${response.errorMessage}`)
    return
   }
  // close modal
  handleCloseAddItemModal(true)
  // set msg
  setSuccessMsg(`User Successfully Created`)
}

