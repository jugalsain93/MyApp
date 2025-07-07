import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // Root component
import { appConfig } from './app/app.config';
import 'zone.js';

bootstrapApplication(App, appConfig);
