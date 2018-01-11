import { Lunch } from "./lunch.model";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable()
export class LunchService{
    private lunches: Lunch[] = [];
    constructor(private http: Http){}

    addLunch(lunch:Lunch){
        const body = JSON.stringify(lunch);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):''; // à copier pour tous les endroits ou on veut envoyer un token dans la requete
        return this.http.post("http://localhost:3000/lunch" + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    subscribeLunch(lunch: Lunch){
        const body = JSON.stringify(lunch);
        console.log("body", body);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):''; // à copier pour tous les endroits ou on veut envoyer un token dans la requete
        return this.http.post("http://localhost:3000/lunch/subscribe" + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getLunches(){
        return this.http.get('http://localhost:3000/lunch')
            .map((response: Response) => {
                const lunches = response.json().obj;
                console.log("lunches", lunches);
                let transformedLunches: Lunch[] = [];
                for (let lunch of lunches){
                    transformedLunches.push(new Lunch(
                        lunch.latitude,
                        lunch.longitude,
                        lunch.locationName,
                        lunch.remainingPlaces,
                        lunch.userHost.firstName,
                        lunch.userHost._id,
                        lunch._id,
                        null,
                        lunch.guests
                    ));
                }
                this.lunches = transformedLunches;
                console.log(transformedLunches);
                return transformedLunches;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteLunches(lunch: Lunch){
        this.lunches.splice(this.lunches.indexOf(lunch), 1);
    }
}
