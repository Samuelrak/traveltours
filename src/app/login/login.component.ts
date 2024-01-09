import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../entities/user';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isadmin: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    const userWithToken: User = {
      username: this.username,
      password: this.password,
      token: '',
      isadmin: this.isadmin
    };
  
    this.usersService.login(userWithToken).subscribe(
      (response: User) => {
        this.authService.saveToken(response.token);
        this.authService.saveUsername(response.username);
        this.authService.setIsAdmin(response.isadmin);
        this.authService.setIsLoggedIn(true);
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }
  
}
