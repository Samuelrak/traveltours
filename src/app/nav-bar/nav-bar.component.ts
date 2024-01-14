import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

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
  logoutMessage: string | null = null;
  loginSuccessMessage: string | null = null;
  errorMessage: string = '';


  constructor(public usersService: UsersService, private router: Router, private authService: AuthService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.hasToken();

    if (this.isLoggedIn) {
      this.isAdmin = this.authService.getIsAdmin();
    }

    this.messageService.loginSuccessMessage$.subscribe((message) => {
      this.loginSuccessMessage = message;
      if (message) {
        setTimeout(() => {
          this.messageService.clearLoginSuccessMessage();
        }, 1000);
      }
    });

    this.messageService.loggedInStatusChange.subscribe((value) => {
      this.isLoggedIn = value;
      this.loggedUsername = this.authService.getUsername();
      if (this.isLoggedIn) {
        this.isAdmin = this.authService.getIsAdmin();
      } else {
        this.isAdmin = false;
      }
    });

    this.messageService.logoutMessage$.subscribe((message) => {
      this.logoutMessage = message;
      if (message) {
        setTimeout(() => {
          this.messageService.clearLogoutMessage();
        }, 1000);
      }
    });

    // this.authService.loginErrorMessageSubject$.subscribe((message) => {
    //   this.errorMessage = message;
    //   if (message) {
    //     setTimeout(() => {
    //       this.authService.clearLoginErrorMessage();
    //     }, 1000);
    //   }
    // });
  }

  onLogout() {
    this.usersService.onLogout(); 
  }
}
 
