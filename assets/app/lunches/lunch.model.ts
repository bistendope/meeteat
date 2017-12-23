import { User } from "../auth/user.model";

export class Lunch {
    constructor(
        public location: Coordinates, 
        public userhost: string,
        public remainingPlaces: number,
        public guests: User[]
    ){}
}