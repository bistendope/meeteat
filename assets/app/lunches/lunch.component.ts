import {Component, Input, AfterViewInit} from '@angular/core';
import { Lunch } from "./lunch.model";

@Component({
    selector:'display-lunch',
    templateUrl: './lunch.component.html',
    styleUrls: ['./lunch.component.css']
})
export class LunchComponent{
    @Input() lunch: Lunch; 


    

}