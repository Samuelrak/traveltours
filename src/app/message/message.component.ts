import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  isLoggedIn: boolean = false;
  loggedUsername: string | null = null;
  isAdmin: boolean = false;
  logoutMessage: string | null = null;
  logoutMessageSuccess: string | null = null;
  loginSuccessMessage: string | null = null;
  errorMessage: string = '';
  saveTourMessage: string | null = null;
  deleteTourMessage: string | null = null;

  constructor(private messageService: MessageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.messageService.loginSuccessMessage$.subscribe((message) => {
      this.loginSuccessMessage = message;
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
    });

    this.messageService.logoutMessageSuccess$.subscribe((message) => {
      this.logoutMessageSuccess = message;
    });

    this.messageService.loginErrorMessageSubject$.subscribe((message) => {
      this.errorMessage = message;
    });

    this.messageService.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
    });
    this.messageService.saveMessage$.subscribe((message) => {
      this.saveTourMessage = message;
    });
    this.messageService.deleteMessage$.subscribe((message) => {
      this.deleteTourMessage = message;
    });
  }
}
