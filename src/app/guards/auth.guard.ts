import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const isLoggedIn = this.authService.isLoggedIn();
    const isAdmin = this.authService.getIsAdmin();

    if (isLoggedIn) {
      if (isAdmin) {
        this.router.navigate(['/tours']);
        return false;
      }
      return true; 
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; 
    }
  }
}