import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {UserComponent} from "./auth/user.component";
import {LunchComponent} from "./lunches/lunch.component";
import {ListLunchesComponent} from "./lunches/lunches-list.component";
import {AddLunchComponent} from "./lunches/add-lunch.component";
import {SignupComponent} from "./auth/signup.component";
import {SigninComponent} from "./auth/signin.component";
import {LogoutComponent} from "./auth/logout.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { LunchesComponent } from "./lunches/lunches.component";
import { routing } from "./app.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";

@NgModule({
    declarations: [
        AppComponent,
        LunchComponent,
        UserComponent,
        ListLunchesComponent,
        AddLunchComponent,
        SignupComponent,
        SigninComponent,
        LogoutComponent,
        AuthenticationComponent,
        HeaderComponent,
        LunchesComponent
    ],
    imports: [
        BrowserModule, 
        routing, 
        FormsModule, 
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAf7dPFv5psIncDlBdSewfaqGz3db7s-yQ'
          })],
    bootstrap: [AppComponent]
})
export class AppModule{

}