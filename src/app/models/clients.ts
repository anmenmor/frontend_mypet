export class Clients{

    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: number;
    available: boolean;
    

    constructor(obj : any){
        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.password = obj.password;
        this.email = obj.email;
        this.phone = obj.phone;
        this.available = obj.available;
    }
}