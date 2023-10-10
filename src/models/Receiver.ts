import User, { UserInterface } from './abstractClasses/User'
import {UserTypes} from '../../constants'

class Receiver extends User {

 constructor({id, name, email, password, phone, location, userType}: UserInterface) {
    // must call super()
    super({ id, name, email, phone, password, location, userType })
    this.userType = UserTypes.RECEIVER
  }
}
export default Receiver
