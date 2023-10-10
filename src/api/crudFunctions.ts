// import { getFirestore } from 'firebase-admin/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../services/firebase.config'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { Collections, FunctionStatus } from '../../constants'
import { UserTypes } from '../../constants'
import Donor from '../models/Donor'
import Receiver from '../models/Receiver'
import User from '../models/abstractClasses/User'

// general format return for firebase crud functions
type ReturnObj = {
  status: FunctionStatus
  errorCode?: string
  errorMessage?: string
}
type UserObj = {
  name: string
  email: string
  password?: string
  phone?: string
  location: string
  userType: UserTypes
}
// types for each funciont in crudFunctions
type T = {
  createNewUser: (User: User) => Promise<ReturnObj>
  addNewUser: (User: User) => Promise<ReturnObj>
  getUser: ({email, userType}: {email: string, userType: UserTypes}) => Promise<UserObj|undefined>
  testAddNewUser: (user: any) => any
}
const crudFunctions: T = {
  // https://css-tricks.com/user-registration-authentication-firebase-react/#creating-user-registration-functionality
  // create a new Auth user & add new User to db as document
  createNewUser: async (User: User) => {
    // call firebase func to add auth user first
    return createUserWithEmailAndPassword(auth, User.email, User.password as string)
      .then(async (userCredential) => {
        // Signed in + created auth user ok
        const authUser = userCredential.user
        console.log(authUser, 'authUser')
        // const {...user} = User
        try {
          const newUser = await crudFunctions.addNewUser(User)
          console.log('NEW USER', newUser)
          return {
            status: FunctionStatus.OK,
            errorCode: undefined,
            errorMessage: undefined,
          }
        } catch (error) {
          console.error(error, 'Error in crudFunctions.createNewUser')
          return {
            status: FunctionStatus.ERROR,
            errorCode: undefined,
            errorMessage: error as string,
          }
        }
      })
      .catch((error) => {
        // firebase auth errros
        const errorCode: string = error.code
        const errorMessage: string = error.message
        console.error(errorCode, errorMessage)
        return {
          status: FunctionStatus.ERROR,
          errorCode: errorCode,
          errorMessage: errorMessage,
        }
      })
  },
  addNewUser: async (User: User) => {
    if (User.userType === UserTypes.DONOR) {
      try {
        const usersRef = collection(db, Collections.DONORS)
        const { ...user } = User
        // delete PW so not saved as text
        user && delete user?.password
        await setDoc(doc(usersRef, user.email), user)
        return {
          status: FunctionStatus.OK,
          errorCode: undefined,
          errorMessage: undefined,
        }
      } catch (error) {
        return Promise.reject({
          status: FunctionStatus.ERROR,
          errorCode: undefined,
          errorMessage: error as string,
        })
      }
    } else if (User.userType === UserTypes.RECEIVER) {
      try {
        const usersRef = collection(db, Collections.RECEIVERS)
        const { ...user } = User
        await setDoc(doc(usersRef, user.email), user)
        return Promise.resolve({
          status: FunctionStatus.OK,
          errorCode: undefined,
          errorMessage: undefined,
        }) // used to send return val to cntrl
      } catch (error) {
        return Promise.reject({
          status: FunctionStatus.ERROR,
          errorCode: undefined,
          errorMessage: error as string,
        })
      }
    } else {
      const error = new Error('user type not found: Must be donor or receiver')
      return Promise.reject({
        status: FunctionStatus.ERROR,
        errorCode: undefined,
        errorMessage: error,
      })
    }
  },
  getUser: async ({email, userType}) => {
    const pluarlizedUserType = `${userType}s`
    console.log(pluarlizedUserType, 'pluarlizedUserType')
    const docRef = doc(db, pluarlizedUserType, email)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      console.error("No such user document found!");
    }
  },
  testAddNewUser: async (User: User) => {
    // // https://stackoverflow.com/a/66774294/5972531
    // // extract into a vanilla obj for firebase
    const { ...donor } = new Donor({
      name: 'test',
      email: 'test5@hello.com',
      password: 'test3',
      location: 'test3',
      userType: UserTypes.DONOR,
    })
    // Add a new document in collection "cities"
    try {
      const userRef = doc(db, 'users', donor.email)

      // const cityRef = doc(db, 'cities', 'BJ');
      // setDoc(cityRef, { capital: true }, { merge: true });
      const response = await setDoc(userRef, donor)
      console.log(response, 'response')
    } catch (error) {
      // send error to alert
      return new Error('user type not found: Must be donor or receiver')
    }
  },
}
export default crudFunctions
