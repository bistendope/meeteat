import {Component, OnInit} from '@angular/core';
import { Lunch } from "./lunch.model";
import { LunchService } from "./lunch.service";
import { NotificationsService } from "angular2-notifications";
import { GeoCoord, HaversineService } from "ng2-haversine";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";

@Component({
    selector:'all-lunches',
    templateUrl: 'lunches-list.component.html'

})
export class ListLunchesComponent implements OnInit{
    lunches: Lunch[];
    myLatitude: number;
    myLongitude: number;
    alreadySortedRemainingPlaces: boolean = null;
    alreadySortedDistance: boolean = null;

    constructor(private lunchService: LunchService, private _service: NotificationsService, private haversineService: HaversineService, private authService: AuthService){}

    assignDistance(lunch: Lunch){
        let coord1: GeoCoord = { latitude: this.myLatitude, longitude: this.myLongitude};
        let coord2: GeoCoord = { latitude: lunch.latitude, longitude: lunch.longitude};
        lunch.distance = this.haversineService.getDistanceInKilometers(coord1, coord2);
        return lunch;
    }

    onSortByDistance(){
        var order;
        if(!this.alreadySortedDistance){
            order = 1;
            this.alreadySortedDistance = true;
            this.alreadySortedRemainingPlaces = null;
        }else{
            order = -1;
            this.alreadySortedDistance = false;
            this.alreadySortedRemainingPlaces = null;
        }
        this.lunches.sort((nearLunch,farLunch): number => {
            if (nearLunch.distance < farLunch.distance) return -order;
            if (nearLunch.distance > farLunch.distance) return order;
        })
    }
    onSortByRemainingPlaces(){
        var order;
        if(!this.alreadySortedRemainingPlaces){
            order = 1;
            this.alreadySortedRemainingPlaces = true;
            this.alreadySortedDistance = null;
        }else{
            order = -1;
            this.alreadySortedRemainingPlaces = false;
            this.alreadySortedDistance = null;
        }
        this.lunches.sort((lessPlaces,morePlaces): number => {
            if (lessPlaces.remainingPlaces < morePlaces.remainingPlaces) return -order;
            if (lessPlaces.remainingPlaces > morePlaces.remainingPlaces) return order;
        })
    }

    ngOnInit(){
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.myLatitude = position.coords.latitude;
                    this.myLongitude = position.coords.longitude;
                    if(this.authService.isLoggedIn()){
                        this.authService.updatePosition(this.myLatitude, this.myLongitude);
                    }
                    this.lunchService.getLunches()
                    .subscribe(
                        (lunches: Lunch[]) => {
                            this.lunches = lunches;
                            this.lunches.map(lunch => lunch = this.assignDistance(lunch));
                            console.log(this.lunches);
                        }
                );
                    
            },
                error => {
                    this.myLatitude = null;
                    this.myLongitude = null;
                    switch (error.code) {
                        case 1:
                            console.log('Permission non accordée');
                            this._service.warn('Permission non accordée !', "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                        case 2:
                            console.log('Position indisponible');
                            this._service.warn('Position indisponible !', "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                        case 3:
                            console.log('Timeout');
                            this._service.warn("Timeout", "Vous ne pourrez pas voir à quelle distance sont les différents repas proposés.");
                            break;
                    }
                }
            );
        };
        
        
    }
}