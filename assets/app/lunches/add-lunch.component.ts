import {Component, OnInit} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector:'add-lunch',
    templateUrl: 'add-lunch.component.html',
    styleUrls:['./add-lunch.component.css']
})
export class AddLunchComponent implements OnInit{
    geoLocation: Position;
    latitude: number;
    longitude: number;
    zoom: number = 15;
    myLunchForm: FormGroup;
    locationName: String;
    numberGuests: number;
    locationSet: boolean = false;

    ngOnInit(){
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(
                position => {
                this.geoLocation = position,
                    this.latitude = this.geoLocation.coords.latitude,
                    this.longitude = this.geoLocation.coords.longitude
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
            geoLocation: new FormControl(null),
            locationName: new FormControl(null, Validators.required),
            numberGuests: new FormControl(null, Validators.required)
            
        });
        
    }

    onSubmit(){
        console.log(this.myLunchForm);
        this.myLunchForm.reset();
    }

    markerDragEnd(m: marker, $event: any) {
        this.locationSet = true;
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