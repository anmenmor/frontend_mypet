export class Employee {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    admin: boolean;
    workShifts: string;
    specialities: number;
    available: boolean;

    constructor(obj : any){
        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.password = obj.password;
        this.email = obj.email;
        this.admin = obj.admin;
        this.workShifts = obj.work_shift;
        this.specialities = obj.speciality_id;
        this.available = obj.available;
      
    }

    
  }
  
