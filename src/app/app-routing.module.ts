import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToursComponent } from './tours/tours.component';
import { ToursAddComponent } from './tours-add/tours-add.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ToursDetailComponent } from './tours-detail/tours-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tours', component: ToursComponent},
  { path: 'tours-add', component: ToursAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tour-detail/:id', component: ToursDetailComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] 
})
export class AppRoutingModule { }
