import { Component, OnInit } from '@angular/core';
import { SharedStylingService } from '../../shared/shared.service';

@Component({
  selector: 'client-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sharedService: SharedStylingService) {

  }

  ngOnInit() {
    this.sharedService.isDarkColorSubject.next(false);
  }

}
