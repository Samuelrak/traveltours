import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToursComponent } from './tours/tours.component';
import { HttpClientModule } from '@angular/common/http';
import { ToursAddComponent } from './tours-add/tours-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent,
    ToursAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
