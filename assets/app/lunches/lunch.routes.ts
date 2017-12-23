import {Routes} from "@angular/router";
import { AddLunchComponent } from "./add-lunch.component"
import { SearchLunchComponent } from "./search-lunch.component";
import { SearchUserComponent } from "../auth/search-user.component";

export const LUNCH_ROUTES: Routes = [
    {path: '', redirectTo: 'signup', pathMatch: 'full'},
    {path: 'addlunch', component: AddLunchComponent},
    {path: 'searchlunch', component: SearchLunchComponent},
    {path: 'searchuser', component: SearchUserComponent},
    
];