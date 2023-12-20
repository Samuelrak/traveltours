import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../entities/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'travel tours';
  isLoggedIn: boolean = false;

  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.usersService.isLogged(); 
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
