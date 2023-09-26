import User, { UserInterface } from './abstractClasses/User'
import {UserTypes} from '../../constants'

class Donor extends User {

  constructor({name, email, password, phone, location, userType}: UserInterface) {
     // must call super()
     super({ name, email, phone, password, location, userType })
     this.userType = UserTypes.RECEIVER
   }
   
  
 }
export default Donor
