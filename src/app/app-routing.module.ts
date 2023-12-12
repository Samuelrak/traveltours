import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToursComponent } from './tours/tours.component';
import { ToursAddComponent } from './tours-add/tours-add.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'tours-add', component: ToursAddComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }