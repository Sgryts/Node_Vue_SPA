import { Component, OnInit } from '@angular/core';
import { invoke } from 'lodash';

@Component({
  selector: 'client-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // const that = window;
    invoke(window, 'burgerMenuClick');
  }
}
