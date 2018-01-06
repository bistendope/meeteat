import {Component, OnInit} from '@angular/core';
import { Lunch } from "./lunch.model";
import { LunchService } from "./lunch.service";
import { NotificationsService } from "angular2-notifications";
import { GeoCoord, HaversineService } from "ng2-haversine";
import 'rxjs/Rx';

@Component({
    selector:'all-lunches',
    template: `
<button type="button" class="btn btn-primary" (click)="onSortByDistance()">Trier par distance</button>
<div>
    <ul class="list-group">
    <display-lunch  [lunch]="lunch" *ngFor="let lunch of lunches"></display-lunch>
    </ul>
</div>
`

})
export class ListLunchesComponent implements OnInit{
    lunches: Lunch[];
    myLatitude: number;
    myLongitude: number;

    constructor(private lunchService: LunchService, private _service: NotificationsService, private haversineService: HaversineService){}

    assignDistance(lunch: Lunch){
        let coord1: GeoCoord = { latitude: this.myLatitude, longitude: this.myLongitude};
        let coord2: GeoCoord = { latitude: lunch.latitude, longitude: lunch.longitude};
        lunch.distance = this.haversineService.getDistanceInKilometers(coord1, coord2);
        return lunch;
    }

    onSortByDistance(){
        this.lunches.sort((nearLunch,farLunch): number => {
            if (nearLunch.distance < farLunch.distance) return -1;
            if (nearLunch.distance > farLunch.distance) return 1;
        })
    }

    ngOnInit(){
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.myLatitude = position.coords.latitude;
                    this.myLongitude = position.coords.longitude;
                    this.lunchService.getLunches()
                    .subscribe(
                        (lunches: Lunch[]) => {
                            this.lunches = lunches;
                            this.lunches.map(lunch => lunch = this.assignDistance(lunch));
                        }
                );
                    
            },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission non accordée');
                            this.myLatitude = null;
                            this.myLongitude = null;
                            this._service.warn('Permission non accordée !', "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                        case 2:
                            console.log('Position indisponible');
                            this.myLatitude = null;
                            this.myLongitude = null;
                            this._service.warn('Position indisponible !', "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                        case 3:
                            console.log('Timeout');
                            this.myLatitude = null;
                            this.myLongitude = null;
                            this._service.warn("Timeout", "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                    }
                }
            );
        };
        
        
    }
}