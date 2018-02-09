import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ENVIRONMENT } from './environments/environment';

/* Modules */
import { AppModule } from './app/app.module';

/* Global Styles */
import './styles/index.css';

if (!ENVIRONMENT.DEBUG) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
