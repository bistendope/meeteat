import {Component, OnInit} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Lunch } from "./lunch.model";
import { LunchService } from "./lunch.service";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector:'add-lunch',
    templateUrl: 'add-lunch.component.html',
    styleUrls:['./add-lunch.component.css']
})
export class AddLunchComponent implements OnInit{

    constructor(private lunchService: LunchService, private _service: NotificationsService){}
    latitude: number;
    longitude: number;
    zoom: number = 15;
    myLunchForm: FormGroup;
    locationName: String;
    numberGuests: String;
    locationSet: boolean = false;

    ngOnInit(){
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.latitude = position.coords.latitude,
                    this.longitude = position.coords.longitude
            },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission non accordée');
                            break;
                        case 2:
                            console.log('Position indisponible');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                }
            );
        };

        this.myLunchForm = new FormGroup({
            locationName: new FormControl(null, Validators.required),
            numberGuests: new FormControl(null, Validators.required)
            
        });
        
    }

    onSubmit(){
        const lunch = new Lunch (
            this.latitude,
            this.longitude,
            this.myLunchForm.value.locationName,
            'testNom',
            this.myLunchForm.value.numberGuests
            
        );
        this.lunchService.addLunch(lunch).subscribe(
            data => this._service.success('Miam !', 'Votre repas a été correctement ajouté '), 
        error => {
            console.error(error);
            this._service.error('Aïe !', "Une erreur est survenue à l'ajout du repas.");
        });
        this.myLunchForm.reset();
    }

    markerDragEnd(m: marker, $event: any) {
        console.log($event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        console.log(this.latitude);
        console.log(this.longitude);
    }
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}