import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class AuthService{
    constructor(private http: Http){
        
    }
    private users: User[] = [];

    getUsers(){
        return this.http.get('http://localhost:3000/user')
            .map((response: Response) => {
                const users = response.json().obj;
                let transformedUsers: User[] = [];
                for (let user of users){
                    transformedUsers.push(new User(
                        user.firstName,
                        user.lastName,
                        user.password,
                        user.email,
                        user.latitude,
                        user.longitude
                    ));
                }
                console.log(transformedUsers);
                this.users = transformedUsers;
                return transformedUsers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updatePosition(latitude: number, longitude: number){
        
        var coords: Coords ={lat:latitude, lng: longitude};
        console.log("updatePosition authservice", coords);
        const body = JSON.stringify(coords);
        const headers = new Headers({'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post("http://localhost:3000/user/position" + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signup(user:User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post("http://localhost:3000/user", body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user:User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post("http://localhost:3000/user/signin", body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
    
}
interface Coords {
	lat: number;
	lng: number;
}