// import { getFirestore } from 'firebase-admin/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../services/firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { Locations } from '../../constants'
import { UserTypes } from '../../constants'
import Donor from '../models/Donor'
import Receiver from '../models/Receiver'


const crudFunctions = {
  // https://css-tricks.com/user-registration-authentication-firebase-react/#creating-user-registration-functionality
  createNewUser: async (name: string, email: string, password: string) => {
    // call firebase func to add auth user first
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in + created ok
        const user = userCredential.user
        // TODO: init Giver/Receiver here
        // TODO: call addNewUser func below
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
  },
  // TODO: this is unfinished - finish it
  addNewUser: async ({ name, phone, location, type }: UpateOnCretateProps) => {
    const newGiver = new Donor({ name, phone, location })
    console.log(newGiver)
    await setDoc(doc(db, 'cities', 'LA'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    })
  },
}
export default crudFunctions
