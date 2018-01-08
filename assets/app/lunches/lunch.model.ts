import { User } from "../auth/user.model";

export class Lunch {
    constructor(
        public latitude: number,
        public longitude: number,
        public locationName: string, 
        public remainingPlaces: number,
        public userHost?: string,
        public userId?: string,
        public distance?: number,
        public guests?: User[]
        
    ){}
}