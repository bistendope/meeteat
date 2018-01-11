import {Component, Input, AfterViewInit} from '@angular/core';
import { Lunch } from "./lunch.model";
import { LunchService } from "./lunch.service";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector:'display-lunch',
    templateUrl: './lunch.component.html',
    styleUrls: ['./lunch.component.css']
})
export class LunchComponent{
    alreadySubscribed: boolean;
    @Input() lunch: Lunch; 
    constructor(private lunchService: LunchService, private _service: NotificationsService){};
    subscribeLunch(){
        this.lunchService.subscribeLunch(this.lunch).subscribe(
            data => {
                this.lunch.remainingPlaces =data.obj.remainingPlaces;
                this.lunch.guests = data.obj.guests.firstName;
                console.log(this.lunch);
                this.alreadySubscribed = false;
                if(data.alreadySubscribed){
                    this.alreadySubscribed = true;
                    this._service.warn('Oops', 'Vous êtes déjà inscrit à ce repas ');
                    console.log(data);
                }else if(!data.subscribed){
                    this._service.warn('Mais..', 'Il ne reste plus de place pour ce repas ');
                    
                }else{
                    
                    this._service.success('Ok !', 'Vous êtes bien inscrit à ce repas ');
                    console.log(data);
                }
            },
            error => {
                console.error(error);
                this._service.error('Aïe !', "Une erreur est survenue à l'inscription à ce repas.");
            }
        );
    }
    

}