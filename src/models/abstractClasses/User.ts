interface UserInterface {
    name: string
    email: string
    password: string
    phone: string
    location: string
}

abstract class User {
    name: string;
    email: string;
    phone: string;
    password: string;
    location: string;
    
    constructor({name, email, password, phone, location}: UserInterface) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.location = location;
    }

    display(): void{
        console.log(this.name);
    }
}
export default User;
