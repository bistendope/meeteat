import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {UserComponent} from "./auth/user.component";
import {LunchComponent} from "./lunches/lunch.component";
import {ListLunchesComponent} from "./listLunches/listLunches.component";
import {AddLunchComponent} from "./addLunch/addLunch.component";
import {AddUserComponent} from "./addUser/addUser.component";

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