import {Component, OnInit} from '@angular/core';
import { NotificationsService } from "angular2-notifications";
import { GeoCoord, HaversineService } from "ng2-haversine";
import 'rxjs/Rx';
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector:'search-user',
    templateUrl:'search-user.component.html'

})
export class SearchUserComponent implements OnInit{
    alreadySortedDistance: boolean = null;
    users: User[];
    myLatitude: number;
    myLongitude: number;

    constructor(private _service: NotificationsService, private haversineService: HaversineService, private authService: AuthService){}

    assignDistance(user: User){
        let coord1: GeoCoord = { latitude: this.myLatitude, longitude: this.myLongitude};
        let coord2: GeoCoord = { latitude: user.latitude, longitude: user.longitude};
        console.log("au secours", coord1, coord2);
        user.distance = this.haversineService.getDistanceInKilometers(coord1, coord2);
        return user;
    }

    onSortByDistance(){
        var order;
        if(!this.alreadySortedDistance){
            order = 1;
            this.alreadySortedDistance = true;
        }else{
            order = -1;
            this.alreadySortedDistance = false;
        }
        this.users.sort((nearUser,farUser): number => {
            if (nearUser.distance < farUser.distance) return -order;
            if (nearUser.distance > farUser.distance) return order;
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
                    this.authService.getUsers()
                    .subscribe(
                        (users: User[]) => {
                            this.users = users;
                            this.users.map(user => user = this.assignDistance(user));
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