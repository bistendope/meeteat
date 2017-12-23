import {Component, OnInit} from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
    selector:'add-lunch',
    templateUrl: 'add-lunch.component.html',
    styleUrls:['./add-lunch.component.css']
})
export class AddLunchComponent implements OnInit{
    locationPosition: Position;
    latitude: number;
    longitude: number;
    zoom: number = 14;

    ngOnInit(){
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(
                position => {
                this.locationPosition = position,
                    this.latitude = this.locationPosition.coords.latitude,
                    this.longitude = this.locationPosition.coords.longitude
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
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
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