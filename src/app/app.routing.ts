import { Injectable, Component } from '@angular/core';
import { Routes, Route, RouterStateSnapshot, Resolve, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AnimationTriggerMetadata, trigger, transition, style, animate, state } from '@angular/animations';

/* Views */

/* Routing modules */


/* Router */
export const APP_ROUTES: Routes = [
  /** @TODO */
];

/* Animations (POC) */
export const APP_ROUTE_ANIMATIONS: AnimationTriggerMetadata[] = [
  trigger('routerAnimations', [
    transition('v-trip-search => v-contact-us', [
      style({
        opacity: 0,
      }),
      animate(500, style({
        opacity: 1,
      })),
    ]),
  ]),
];

/* Define our providers */
export const APP_ROUTING_PROVIDERS: any[] = [

];
