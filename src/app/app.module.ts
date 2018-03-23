import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { APP_ROUTES, APP_ROUTING_PROVIDERS } from './app.routing';
import { TreeModule } from './tree/tree.module';

@NgModule({

  imports: [
    /* @ANGULAR */
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    /* FÖRETAGARE */
    RouterModule.forRoot(APP_ROUTES),
    TreeModule,
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
