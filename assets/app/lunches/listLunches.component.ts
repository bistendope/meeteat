import {Component} from '@angular/core';

@Component({
    selector:'all-lunches',
    template: `
<span>
    
    <display-lunch *ngFor="let guest of guests"></display-lunch>

</span>
`
})
export class ListLunchesComponent{

}