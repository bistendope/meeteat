import {Component, OnInit} from '@angular/core';
import { Lunch } from "./lunch.model";
import { LunchService } from "./lunch.service";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector:'all-lunches',
    template: `
<span>
    <ul class="list-group">
    <display-lunch [(myLatitude)]="latitude" [(myLongitude)]="longitude" [lunch]="lunch" *ngFor="let lunch of lunches"></display-lunch>
    </ul>
</span>
`

})
export class ListLunchesComponent implements OnInit{
    lunches: Lunch[];
    latitude: number;
    longitude: number;

    constructor(private lunchService: LunchService, private _service: NotificationsService){}

    ngOnInit(){
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.latitude = position.coords.latitude,
                    this.longitude = position.coords.longitude,
                    console.log("lunches-list", this.latitude, this.longitude)
            },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission non accordée');
                            this.latitude = null;
                            this.longitude = null;
                            this._service.warn('Permission non accordée !', "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                        case 2:
                            console.log('Position indisponible');
                            this.latitude = null;
                            this.longitude = null;
                            this._service.warn('Position indisponible !', "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                        case 3:
                            console.log('Timeout');
                            this.latitude = null;
                            this.longitude = null;
                            this._service.warn("Timeout", "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                    }
                }
            );
        };
        this.lunchService.getLunches()
            .subscribe(
                (lunches: Lunch[]) => {
                    this.lunches = lunches;
                }
        );
    }
}