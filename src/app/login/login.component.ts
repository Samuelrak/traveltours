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
    private route: ActivatedRoute, 
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.messageService.loginErrorMessageSubject$.subscribe((message) => {
      this.errorMessage = message;
      if (message) {
        setTimeout(() => {
          this.messageService.clearLoginErrorMessage();
        }, 1000);
      }
    });
  }

  onLogin() {
    this.usersService.onLogin(this.username, this.password);
  }
}
