import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
  }

  onLogin() {
    this.usersService.onLogin(this.username, this.password);
  }
}
