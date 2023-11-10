// import { getFirestore } from 'firebase-admin/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../services/firebase.config'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { Collections, FunctionStatus } from '../../constants'
import { UserTypes } from '../../constants'
import User from '../models/abstractClasses/User'
import Item from '../models/Item'
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

// wrapper return details on add funcs
// lets us know if ok or error
type AddFuncStatusReturn = {
  status: FunctionStatus
  errorCode?: string
  errorMessage?: string
}
// wrapper for FB return to know type
export type UserGetByTypeReturn = {
  data: User
  userType: UserTypes
}
// types for each funciont in crudFunctions
type T = {
  createNewUser: (User: User) => Promise<AddFuncStatusReturn>;
  addNewUser: (User: User) => Promise<AddFuncStatusReturn>;
  getUserTypeUnkown: (id: string) => Promise<UserGetByTypeReturn | undefined>;
  getUserByType: ({id,userType}: {id: string, userType: UserTypes}) => Promise<User | undefined>;
  getItemsByUser: (
    user: User
  ) => Promise<Item[]>
  updateEntireItem: (item: Item, image?: File | undefined) => Promise<AddFuncStatusReturn | undefined>; 
  updateItem: (item: Item, propToUpdate: string, value: any) => Promise<AddFuncStatusReturn | undefined>; 
  deleteItem: (item: Item) => Promise<AddFuncStatusReturn | undefined>;
  addNewItem: (item: any, image: File | undefined) => Promise<AddFuncStatusReturn>;
  getItems: () =>  Promise<Item[]>;
  addImage: (item: Item, image: File | undefined) => Promise<AddFuncStatusReturn>; 
}
const crudFunctions: T = {
  // https://css-tricks.com/user-registration-authentication-firebase-react/#creating-user-registration-functionality
  // create a new Auth user & add new User to db as document
  // user obj comes from form
  createNewUser: async (User: User) => {
    // call firebase func to add auth user first
    return createUserWithEmailAndPassword(
      auth,
      User.email,
      User.password as string
    )
      .then(async (userCredential) => {
        // Signed in + created auth user ok
        const authUser = userCredential.user
        console.log(authUser, 'authUser')
        // add ID to user obj
        User.setId = authUser.uid
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
        // hacky quick fix: delete PW so not saved as text
        user && delete user?.password
        await setDoc(doc(usersRef, user.id), user)
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
         // hacky quick fix: delete PW so not saved as text
         user && delete user?.password
        await setDoc(doc(usersRef, user.id), user)
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
  addNewItem: async (Item: Item, image: File | undefined) => {
    if (image) {
      await crudFunctions.addImage(Item, image);
    }

    const itemsRef = collection(db, Collections.ITEMS)
    // get JS obj out of class
    const { ...item } = Item
    await addDoc(itemsRef, {
      // spread into DB to avoid nested obj
      ...item,
    })
    
    try {
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
  },
  // get all items
  getItems: async () => {
    const querySnapshot = await getDocs(collection(db, Collections.ITEMS))

    // inferred type
    const items: Item[] = []
    querySnapshot.forEach((doc) => {
      // build new Item
      const item = new Item(doc.data() as Item)
      // manually add ID
      item.setItemId = doc.id
      items.push(item)  
    }) 
    // return array of items
    return items
  },
  // get all items associate with a user based on user type
  getItemsByUser: async (user: User) => {

    const userType = user.userType
    // get all donors or recievers
    const itemsRef = collection(db, Collections.ITEMS)
    // query for all items matching user id
    const items: Item[]  = []
    const IDType = userType === UserTypes.DONOR ? 'donorId' : userType === UserTypes.RECEIVER ? 'receiverId' : undefined 
    if (!IDType) {
      console.error('IDType not set in getItemsByUser')
      return []
    }
      const q = query(itemsRef, where(IDType, '==', user.id))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const item = new Item(doc.data() as Item)
        item.setItemId = doc.id
        items.push(item)
      })
  
    return items
  },
  // update an item; takes key/value to update
  updateItem: async (item: Item, propToUpdate: string, value: any) => {
    const itemRef = doc(db, `${Collections.ITEMS}/${item.id}`)
    if (itemRef) {
      try {
        await updateDoc(itemRef, {
          // propToUpdate should only be a value from within ItemInterface
          [propToUpdate]: value,
        })
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
    }
  },
  // overwrite all item values
  updateEntireItem: async (item: Item, image?: File | undefined) => {
      try {
        if (!item !|| !item?.id) return
        
        if (image) {
          await crudFunctions.addImage(item, image);
        }
        else {
          const querySnapshot_temp_2 = await getDocs(collection(db, Collections.ITEMS));
          const matchingItem_temp_2 = querySnapshot_temp_2.docs.find(doc => doc.id === item.id);
          if (matchingItem_temp_2) {
            item.image = matchingItem_temp_2?.data().image
          }
        }

        const { ...newItem } = item
        await setDoc(doc(db, "items", newItem.id as string), newItem)
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
  },
  deleteItem: async (item: Item) => {
      if (!item !|| !item?.id) return
    try {
    await deleteDoc(doc(db, "items", item.id))
     return Promise.resolve({
      status: FunctionStatus.OK,
      errorCode: undefined,
      errorMessage: undefined,
    }) 
  } catch (error) {
    return Promise.reject({
      status: FunctionStatus.ERROR,
      errorCode: undefined,
      errorMessage: error as string,
    })
  }
},
  // gets user by checking Donor or Receiver collection matches id
  getUserTypeUnkown: async (id: string) => {
    let docRef = doc(db, 'donors', id)
    let docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return {
        data: docSnap.data() as User,
        userType: UserTypes.DONOR,
      } as UserGetByTypeReturn
    }
    docRef = doc(db, 'receivers', id)
    docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return {
        data: docSnap.data() as User,
        userType: UserTypes.RECEIVER,
      } as UserGetByTypeReturn
    }
    return
  },
  // gets user of known type by id
  getUserByType: async ({ id, userType }) => {
    const pluarlizedUserType = `${userType}s`
    // console.log(id, 'getUserByType id')
    const docRef = doc(db, pluarlizedUserType, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as User
    } else {
      // docSnap.data() will be undefined in this case
      console.error('No such user document found!')
    }
  },
  addImage: async (item: Item, image: File | undefined) => {

    if (!image) {
      return Promise.resolve({
        status: FunctionStatus.OK,
        errorCode: undefined,
        errorMessage: 'No image provided',
      });
    }
    try {
    
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${image.name}`;
      const storage = getStorage();
      const imageRef = ref(storage, 'images/' + fileName);

      try {
        const snapshot = await uploadBytes(imageRef, image);
        console.log('Uploaded a file!');
        const downloadURL = await getDownloadURL(imageRef);
        //console.log(downloadURL)
        item.image = downloadURL;
        //console.log(item.image)
      } catch (error) {
        console.log(error.code)
      }

      return Promise.resolve({
        status: FunctionStatus.OK,
        errorCode: undefined,
        errorMessage: undefined,
      });
    } catch (error) {
      return Promise.resolve({
        status: FunctionStatus.ERROR,
        errorCode: undefined,
        errorMessage: error as string,
      });
    }
  },
}
export default crudFunctions
