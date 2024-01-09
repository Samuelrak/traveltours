import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'travel tours';
  isLoggedIn: boolean = false;
  loggedUsername: string | null = null;
  isAdmin: boolean = false;

  constructor(public usersService: UsersService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.hasToken();
    this.loggedUsername = this.authService.getUsername();

    if (this.isLoggedIn) {
      this.isAdmin = this.authService.getIsAdmin();
    }

    this.authService.loggedInStatusChange.subscribe((value) => {
      this.isLoggedIn = value;
      this.loggedUsername = this.authService.getUsername();

      if (this.isLoggedIn) {
        this.isAdmin = this.authService.getIsAdmin();
      } else {
        this.isAdmin = false;
      }
    });
  }
}
