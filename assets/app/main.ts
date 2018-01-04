import './polyfills';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from "./app.module";
import 'angular2-notifications';

platformBrowserDynamic().bootstrapModule(AppModule);