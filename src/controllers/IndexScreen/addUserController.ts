import { set } from 'firebase/database'
import { UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import Donor from '../../models/Donor'
import Receiver from '../../models/Receiver'
import { matchSorter } from 'match-sorter'

interface IForm {
  e: React.FormEvent<HTMLFormElement>
  currentRadio: UserTypes
  setValidated: (bool: boolean) => void
  setComparePassword: (bool: boolean|undefined) => void
}

const doPasswordsMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword
}
export const handleSubmit = ({
  e,
  currentRadio,
  setValidated,
  setComparePassword,
}: IForm) => {
  // reset to defualt state
  setComparePassword(undefined)

  // get user data from form
  const form = e?.currentTarget
  
  // get user data from form
  const name = form['user-name']?.value
  const email = form?.email?.value
  const phone = form?.phone?.value
  const location = form?.location?.value
  const userType = currentRadio
  const password = form?.password?.value
  const confirmPasswordElem = form['confirm-password']
  const confirmPassword = confirmPasswordElem?.value

  // if form validations fail
  if (form.checkValidity() === false) {
    e.stopPropagation()
    e.preventDefault()
  } 
  // if fields not blank
  if (password && confirmPassword) {
  //  handle password matches
     const pwMatch = doPasswordsMatch(password, confirmPassword) 
     if(!pwMatch) {
       confirmPasswordElem.setCustomValidity("Passwords don't match")
       confirmPasswordElem.reportValidity()
       setComparePassword(false)
       e.stopPropagation()
       e.preventDefault()
     } else {
      // reset to empry string wnen valid
      confirmPasswordElem.setCustomValidity("")
       confirmPasswordElem.reportValidity()
      setComparePassword(true)
     }
  }
  // sends validations back to form
  setValidated(true)
  // build User obj
  const user =
    userType === UserTypes.DONOR
      ? new Donor({ name, email, phone, location, userType, password })
      : new Receiver({ name, email, phone, location, userType, password })
}
