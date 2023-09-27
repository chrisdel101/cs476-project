import {UserTypes} from '../../../constants'

interface UserInterface {
    name?: string | null
    email?: string | null
    password?: string | null
    phone?: string | null
    location?: string | null
    userType?: UserTypes | null
}

abstract class User {
    name: string | null
    email: string | null;
    phone: string | null;
    password: string | null;
    location: string | null;
    userType: UserTypes | null;
    
    constructor({name, email, password, phone, location, userType}: UserInterface) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.location = location;
        this.userType = userType;
    }

    display(): void{
        console.log(this.name);
    }
}
export default User;
export type {UserInterface};
