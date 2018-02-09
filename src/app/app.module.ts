import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { NgComponentsModule } from '@evry/ng-components';
import {
  DtmService,
  EpiViewDataResolver,
  EpiViewDataService,
  Logger,
  NgCoreModule,
  ViewDataResolver,
  ViewDataService,
} from '@evry/ng-core';

import { AppComponent } from './app.component';
import { APP_ROUTES, APP_ROUTING_PROVIDERS } from './app.routing';

@NgModule({

  imports: [
    /* @ANGULAR */
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

    /* @EVRY */
    NgCoreModule.forRoot(),
    NgComponentsModule.forRoot(),

    /* FÖRETAGARE */
    RouterModule.forRoot(APP_ROUTES),
  ],

  declarations: [
    AppComponent,
  ],

  providers: [
    /* LOCALE */
    {
      provide: LOCALE_ID,
      useValue: 'sv-SE',
    },
    /* Location Strategy */
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    APP_ROUTING_PROVIDERS,
  ],

  bootstrap: [AppComponent],
})

export class AppModule { }
