import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    const token = this.authService.getToken();
    const username = this.authService.getUsername();
    const isadmin = this.authService.getIsAdmin();
  
    if (!token || !username) {
      console.error('Token or username or isadmin not found.');
      return;
    }
  
    this.usersService.logout(username, token, isadmin).subscribe(
      () => {
        console.log('Logout successful');
        this.authService.clearStorage();
        this.router.navigate(['/']);
        this.authService.setIsLoggedIn(false);
        this.authService.clearAdminStatus();
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
}