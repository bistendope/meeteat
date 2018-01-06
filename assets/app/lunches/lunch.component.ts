import {Component, Input, OnInit} from '@angular/core';
import { Lunch } from "./lunch.model";
import { HaversineService, GeoCoord } from "ng2-haversine";

@Component({
    selector:'display-lunch',
    templateUrl: './lunch.component.html',
    styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit{
    constructor(private haversineService: HaversineService){}
    @Input() lunch: Lunch; 
    @Input() myLatitude: number;
    @Input() myLongitude: number;
    distance: number;

    ngOnInit(){
        if (this.myLatitude == null || this.myLongitude == null){
            this.distance = null;
            console.log("lunch", this.myLatitude, this.myLongitude);
        }else{
            let coord1: GeoCoord = { latitude: this.myLatitude, longitude: this.myLongitude};
            let coord2: GeoCoord = { latitude: this.lunch.latitude, longitude: this.lunch.longitude};
            this.distance = this.haversineService.getDistanceInKilometers(coord1, coord2);
        }
    }
}