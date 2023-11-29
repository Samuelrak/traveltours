import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToursComponent } from './app/tours/tours.component';
import { ToursService } from './app/tours.service';
import { AppComponent } from './app/app.component';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    ToursService,
  ],
  bootstrap: [ToursComponent],
})
export class AppModule {}