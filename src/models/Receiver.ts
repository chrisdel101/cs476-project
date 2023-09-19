import User from './abstractClasses/User'

class Receiver extends User {
  constructor(
    name: string,
    email: string,
    password: string,
    phone: string,
    location: string
  ) {
      // must call super()
    super(name, email, phone, password, location) 
  }
}
export default Receiver
