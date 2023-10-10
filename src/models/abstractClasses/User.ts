import {UserTypes} from '../../../constants'

interface UserInterface {
    id?: string
    name: string
    email: string
    password?: string
    phone?: string
    location: string
    userType: UserTypes
}

abstract class User implements UserInterface{
    id?: string
    name: string
    email: string;
    phone?: string;
    password?: string;
    location: string;
    userType: UserTypes;
    
    constructor({id, name, email, password, phone, location, userType}: UserInterface) {
        this.id = id
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.location = location;
        this.userType = userType;
    }

    set setId(id: string){
        this.id = id
    }
}
export default User;
export type {UserInterface};
