import {UserTypes} from '../../../constants'

interface UserInterface {
    name: string
    email: string
    password: string
    phone?: string
    location: string
    userType: UserTypes
}

abstract class User implements UserInterface{
    name: string
    email: string;
    phone?: string;
    password: string;
    location: string;
    userType: UserTypes;
    
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
