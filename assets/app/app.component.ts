import {Component} from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from "angular2-notifications";

@Component({
    selector:'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent{
    constructor( private _service: NotificationsService ) {}
}