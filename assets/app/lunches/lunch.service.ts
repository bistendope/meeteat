import { Lunch } from "./lunch.model";

export class LunchService{
    private lunches: Lunch[] = [];

    addLunch(lunch: Lunch){
        this.lunches.push(lunch);
        console.log(lunch);
    }

    getLunch(){
        return this.lunches;
    }

    deleteLunches(lunch: Lunch){
        this.lunches.splice(this.lunches.indexOf(lunch), 1);
    }
}
