// import { getFirestore } from 'firebase-admin/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../services/firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { Locations } from '../../constants'
import { UserTypes } from '../../constants'
import Giver from '../models/Giver'
import Receiver from '../models/Receiver'


const crudFunctions = {
  // https://css-tricks.com/user-registration-authentication-firebase-react/#creating-user-registration-functionality
  createNewUser: async (name: string, email: string, password: string) => {
    console.log('createNewUser', email, password)
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in + created
        const user = userCredential.user
        const phone = '9900999'
        addNewUser({
          name,
          phone,
          location: Locations.REGINA,
          userType: UserTypes.GIVER,
        })
        console.log('OKAY', user)
      })
      .catch((error) => {
        console.log('ERROR', error)
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  },
  // upddates user name and profile pic only
  updateUserAuthProfile: (name: string) => {
    const currentUser = auth.currentUser
    if (!currentUser) return
    updateProfile(currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      })
  },
  addNewUser: async ({ name, phone, location, type }: UpateOnCretateProps) => {
    const newGiver = new Giver({ name, phone, location })
    console.log(newGiver)
    await setDoc(doc(db, 'cities', 'LA'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    })
  },
}
export default crudFunctions
