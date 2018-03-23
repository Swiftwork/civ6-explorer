import { Location } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Route, Router, RouterOutlet, Routes, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'div#root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private _routeScrollPositions: { [url: string]: number } = {};
  private _subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  /* @TODO ADDED BUT NEEDS TO BE LOOKED AT */
  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
