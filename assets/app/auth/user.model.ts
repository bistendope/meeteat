export class User {
    constructor(
        public firstName: string, 
        public lastName: string,
        public password: string, 
        public email: string,
        public latitude?: number,
        public longitude?: number,
        public distance?: number
    ){}
}