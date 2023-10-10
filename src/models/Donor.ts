import User, { UserInterface } from './abstractClasses/User'
import {UserTypes} from '../../constants'

class Donor extends User {

  constructor({id, name, email, password, phone, location, userType}: UserInterface) {
     // must call super()
     super({id, name, email, phone, password, location, userType })
     this.userType = UserTypes.DONOR
   }
   
  
 }
export default Donor
