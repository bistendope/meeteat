import {Routes, RouterModule} from "@angular/router";
import { LunchesComponent } from "./lunches/lunches.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'lunches', pathMatch: 'full'},
    {path: 'lunches', component: LunchesComponent},
    {path: 'authentication', component: AuthenticationComponent, children: AUTH_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
