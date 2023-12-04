import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToursComponent } from './tours/tours.component';
import { ToursAddComponent } from './tours-add/tours-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'tours', component: ToursComponent },
  { path: 'tours-add', component: ToursAddComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }