import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public isLoggedIn = false;
  public loggedInStatusChange = new Subject<boolean>();
  private loginSuccessMessageSubject = new Subject<string>();
  private loginErrorMessageSubject = new Subject<string>();
  public loginSuccessMessage$ = this.loginSuccessMessageSubject.asObservable();
  public loginErrorMessageSubject$ = this.loginErrorMessageSubject.asObservable();
  private logoutMessageSubject = new Subject<string>();
  public logoutMessage$ = this.logoutMessageSubject.asObservable();

  constructor() { }
  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
    this.loggedInStatusChange.next(value);
  }
  setLoginSuccessMessage(message: string) {
    this.loginSuccessMessageSubject.next(message);
  }
  setLoginErrorMessage(message: string) {
    this.loginErrorMessageSubject.next(message); 
  }
  clearLoginSuccessMessage():void {
    this.loginSuccessMessageSubject.next('');
  }
  clearLoginErrorMessage():void {
    this.loginErrorMessageSubject.next('');
  }
  setLogoutMessage(message: string) {
    this.logoutMessageSubject.next(message);
  }
  clearLogoutMessage() {
    this.logoutMessageSubject.next('');
  }
}
