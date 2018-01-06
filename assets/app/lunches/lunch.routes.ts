import {Routes} from "@angular/router";
import { AddLunchComponent } from "./add-lunch.component"
import { SearchUserComponent } from "../auth/search-user.component";
import { ListLunchesComponent } from "./lunches-list.component";

export const LUNCH_ROUTES: Routes = [
    {path: '', redirectTo: 'addlunch', pathMatch: 'full'},
    {path: 'addlunch', component: AddLunchComponent},
    {path: 'searchlunch', component: ListLunchesComponent},
    {path: 'searchuser', component: SearchUserComponent},
    
];