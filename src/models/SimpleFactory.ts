import User from './abstractClasses/User'
import {UserTypes} from '../../constants'
import Donor from './Donor'
import Receiver from './Receiver';

// represents the uninstantiated user by the client, purpose is to call the simple factory
export class UnregisteredUser {     
    e: any;             // represents the passed form 
    type: any;          // represents the user type

    constructor(e: any, type: any) {
        this.e = e;
        this.type = type;
    }

    // calls the simple factory
    CallFactory(): User {
        return new SimpleFactory().CreateUser(this.e, this.type);
    }
}

// FACTORY PATTERN IMPLEMENTATION
class SimpleFactory {

    // this function instantiates a user and returns the user to be added to the database
    CreateUser(e: React.FormEvent<HTMLFormElement>, type: UserTypes): User {
        
        // get user data from form
        const form = e?.currentTarget
        
        // get individual fields from form
        const name = form['user-name']?.value
        const emailElem = form?.email
        const email = emailElem?.value
        const phone = form?.phone?.value
        const location = form?.location?.value
        const userType = type
        const passwordElem = form?.password
        const password = passwordElem?.value

        if (type === 'donor') {             // if the user type is Donor,
            // return a the instantiated Donor user
            return new Donor({ name, email, phone, location, userType, password });
        } else if (type === 'receiver') {   // if the user type is Receiver,
            // return the instantiated Receiver user
            return new Receiver({ name, email, phone, location, userType, password });
        } else {                            // else, throw an error
            throw new Error("User type unsupported by FreeBee");
        }
    }
}
export default SimpleFactory;