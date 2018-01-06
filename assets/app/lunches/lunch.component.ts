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

    getDistance(){
        let coord1: GeoCoord = { latitude: this.myLatitude, longitude: this.myLongitude};
        let coord2: GeoCoord = { latitude: this.lunch.latitude, longitude: this.lunch.longitude};
        return this.haversineService.getDistanceInKilometers(coord1, coord2);
    }

    ngOnInit(){
            
    }
}