import {Component, OnInit} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Lunch } from "./lunch.model";
import { LunchService } from "./lunch.service";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "../auth/auth.service";

@Component({
    selector:'add-lunch',
    templateUrl: 'add-lunch.component.html',
    styleUrls:['./add-lunch.component.css']
})
export class AddLunchComponent implements OnInit{

    constructor(private lunchService: LunchService, private _service: NotificationsService, private authService: AuthService){}
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
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    if(this.authService.isLoggedIn()){
                        this.authService.updatePosition(this.latitude, this.longitude).subscribe(response => console.log(response));
                    }
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
        if(this.isLoggedIn()){
            const lunch = new Lunch (
                this.latitude,
                this.longitude,
                this.myLunchForm.value.locationName,
                this.myLunchForm.value.numberGuests
            );
            this.lunchService.addLunch(lunch).subscribe(
                data => {
                    this._service.success('Miam !', 'Votre repas a été correctement ajouté ');
                    console.log(data);
                },
                error => {
                    console.error(error);
                    this._service.error('Aïe !', "Une erreur est survenue à l'ajout du repas.");
                }
            );
            this.myLunchForm.reset();
        }else{
            this._service.info('Désolé !', 'Vous devez être identifié avant de pouvoir proposer un repas ');
        }
    }

    markerDragEnd(m: marker, $event: any) {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
    }
    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}