import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    this.usersService.login({ username: this.username, password: this.password }).subscribe(
      (response: User) => {
        console.log('Login successful', response);
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  onLogout() {
    this.usersService.logout().subscribe(
      (response: User) => {
        console.log('Logout successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }
}
