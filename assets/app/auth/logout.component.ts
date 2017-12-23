import {Component} from '@angular/core';

@Component({
    selector:'logout',
    template: `
    <div class="col-md-8 col-md-offset-2">
        <button class="btn btn-danger" (click)="onLogout()">
            Se déconnecter
        </button>
    </div>
    `
})
export class LogoutComponent{

}