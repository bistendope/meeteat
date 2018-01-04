import {Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector:'signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent{
    mySigninForm: FormGroup;
    
    constructor(private authService: AuthService, private router: Router, private _service: NotificationsService){}
        onSubmit(){
            const user = new User('', '', this.mySigninForm.value.password, this.mySigninForm.value.email);
            this.authService.signin(user).subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this._service.success('Bienvenue !', 'Vous vous êtes correctement identifié ');
                    this.router.navigateByUrl('/');
                },
                error => {
                    console.error(error);
                    this._service.error('Oops !', 'Vous ne vous êtes pas correctement identifié.');
                }
            );
            this.mySigninForm.reset();
        }
    
        ngOnInit(){
            this.mySigninForm = new FormGroup({
                email: new FormControl(null, [Validators.required, Validators.email]),
                password: new FormControl(null, Validators.required),
                
            });
        }
}