import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector:'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    mySignupForm: FormGroup;

    onSubmit(){
        console.log(this.mySignupForm);
        console.log(this.mySignupForm.value)
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