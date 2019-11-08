import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { APP_ROUTES, APP_ROUTING_PROVIDERS } from './app.routing';
import { LocaleParser } from './services/locale-parser';
import { TreeModule } from './tree/tree.module';

export function initAppFactory(localeParser: LocaleParser) {
  return () => localeParser.loadLocale('en_US', 'Types_Text');
}

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
      provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      deps: [LocaleParser],
      multi: true,
    },
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
