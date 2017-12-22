import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {UserComponent} from "./auth/user.component";
import {LunchComponent} from "./lunches/lunch.component";
import {ListLunchesComponent} from "./lunches/listLunches.component";
import {AddLunchComponent} from "./lunches/addLunch.component";
import {AddUserComponent} from "./auth/addUser.component";

@NgModule({
    declarations: [
        AppComponent,
        LunchComponent,
        UserComponent,
        ListLunchesComponent,
        AddLunchComponent,
        AddUserComponent
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule{

}