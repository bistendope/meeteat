import {Component, Input, AfterViewInit} from '@angular/core';
import { Lunch } from "./lunch.model";
import { HaversineService, GeoCoord } from "ng2-haversine";

@Component({
    selector:'display-lunch',
    templateUrl: './lunch.component.html',
    styleUrls: ['./lunch.component.css']
})
export class LunchComponent{
    constructor(private haversineService: HaversineService){}
    @Input() lunch: Lunch; 


    

}