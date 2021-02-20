import { Component, OnInit } from '@angular/core';
import { SharedStylingService } from '../../shared/shared.service';

@Component({
  selector: 'client-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private sharedService: SharedStylingService) {

  }

  ngOnInit() {
    this.sharedService.isDarkColorSubject.next(true)
  }

}
