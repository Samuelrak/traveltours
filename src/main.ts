import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ToursComponent } from './app/tours/tours.component';

bootstrapApplication(ToursComponent, appConfig)
  .catch((err) => console.error(err));
