import { Component, OnInit } from '@angular/core';
import { SharedStylingService } from '../shared/shared.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'client-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public isDarkColor$: Observable<boolean>;

    constructor(private sharedService: SharedStylingService) {
    }

    ngOnInit() {
        window['burgerMenuClick']();

        this.isDarkColor$ = this.sharedService.isDarkColor$;
    }
}
