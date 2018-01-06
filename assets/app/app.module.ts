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
import { SearchUserComponent } from "./auth/search-user.component";
import { AuthModule } from "angular2-auth";
import { AuthService } from "./auth/auth.service";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LunchService } from "./lunches/lunch.service";
import { HaversineService } from "ng2-haversine";

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
        LunchesComponent,
        SearchUserComponent
    ],
    imports: [
        BrowserModule, 
        routing, 
        FormsModule, 
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAf7dPFv5psIncDlBdSewfaqGz3db7s-yQ'
          }),
        AuthModule.forRoot(),
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot()],
    providers: [AuthService, LunchService, HaversineService],
    bootstrap: [AppComponent]
})
export class AppModule{

}