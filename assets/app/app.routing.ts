import {Routes, RouterModule} from "@angular/router";
import { LunchesComponent } from "./lunches/lunches.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { LUNCH_ROUTES } from "./lunches/lunch.routes";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'lunches', pathMatch: 'full'},
    {path: 'lunches', component: LunchesComponent, children: LUNCH_ROUTES},
    {path: 'authentication', component: AuthenticationComponent, children: AUTH_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
