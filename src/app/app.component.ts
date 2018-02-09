import { Location } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Route, Router, RouterOutlet, Routes, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { Subscription } from 'rxjs';

import { IRouteAlias, RouterX } from '@evry/ng-core';

import { APP_ROUTE_ANIMATIONS } from './app.routing';

declare let routingAliasData: IRouteAlias;

@Component({
  selector: 'div#root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: APP_ROUTE_ANIMATIONS,
})
export class AppComponent {

  private _routeScrollPositions: { [url: string]: number } = {};
  private _subscriptions: Subscription[] = [];

  @HostBinding('@routerAnimations') routerState = '';

  constructor(
    private router: Router,
    private location: Location,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.routerState = event.url.substring(1).replace('/', '-');
      }
    });

    /* Preloaded routing alias */
    if (typeof routingAliasData !== 'undefined') {
      this.router.resetConfig(RouterX.AddRouteAlias(this.router.config, routingAliasData));
      routingAliasData = null;
      document.body.removeChild(document.getElementById('data-routing-alias'));
    }
  }

  /* @TODO ADDED BUT NEEDS TO BE LOOKED AT */
  ngOnInit() {
    this._subscriptions.push(
      // save scroll position on route change
      this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
        if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
          // url path without parameters
          let urlPath = (prevRouteEvent.urlAfterRedirects || prevRouteEvent.url).split(';', 1)[0];
          this._routeScrollPositions[urlPath] = window.pageYOffset;
        }
      }),
    );
    // restore scroll position on back or forward
    // Changed from location to router.events. Location did not trigger in most cases. - Johan
    this.router.events.subscribe(event => {
      // back or forward, wait for router navigation end
      let routerNavigationEnd = this.router.events.first(event => event instanceof NavigationEnd)
        .subscribe((navigationEndEvent: NavigationEnd) => {
          // url path without parameters
          let urlPath = (navigationEndEvent.urlAfterRedirects || navigationEndEvent.url).split(';', 1)[0];
          setTimeout(() => {
            window.scrollTo(0, this._routeScrollPositions[urlPath] || 0);
          }, 0);
        });
    });
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
