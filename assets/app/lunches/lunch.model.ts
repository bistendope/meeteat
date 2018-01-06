import { User } from "../auth/user.model";

export class Lunch {
    constructor(
        public latitude: number,
        public longitude: number,
        public locationName: string, 
        public userHost: string,
        public remainingPlaces: number,
        public distance?: number,
        public guests?: User[]
    ){}
}