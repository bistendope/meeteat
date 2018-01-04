import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector:'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    mySignupForm: FormGroup;

    constructor(private authService: AuthService, private _service: NotificationsService){
        
    }

    onSubmit(){
        const user = new User (
            this.mySignupForm.value.firstName,
            this.mySignupForm.value.lastName,
            this.mySignupForm.value.password,
            this.mySignupForm.value.email
        );
        this.authService.signup(user).subscribe(
            data => this._service.success('Félicitations !', 'Vous êtes correctement inscrit '), 
        error => {
            console.error(error);
            this._service.error('Aïe !', "Une erreur est survenue pendant l'inscription.");
        });
        this.mySignupForm.reset();
    }

    ngOnInit(){
        this.mySignupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required),
            
        });
    }
}