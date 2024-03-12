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
  private logoutMessageSuccessSubject = new Subject<string>();
  public logoutMessageSuccess$ = this.logoutMessageSuccessSubject.asObservable();
  private errorMessageSubject = new Subject<string>();
  public errorMessage$ = this.errorMessageSubject.asObservable(); 
  private messageSubject = new Subject<{ message: string, isSuccess: boolean }>();
  public message$ = this.messageSubject.asObservable();
  private saveMessageSubject = new Subject<string>();
  public saveMessage$ = this.saveMessageSubject.asObservable();
  private deleteMessageSubject = new Subject<string>();
  public deleteMessage$ = this.deleteMessageSubject.asObservable();

  

  constructor() { }
  
  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
    this.loggedInStatusChange.next(value);
  }
  
  setLoginSuccessMessage(message: string) {
    this.loginSuccessMessageSubject.next(message);
    this.clearMessageAfterDelay(this.loginSuccessMessageSubject);
  }
  
  setLoginErrorMessage(message: string) {
    this.loginErrorMessageSubject.next(message); 
    this.clearMessageAfterDelay(this.loginErrorMessageSubject);
  }
  
  clearLoginSuccessMessage():void {
    this.loginSuccessMessageSubject.next('');
  }
  
  clearLoginErrorMessage():void {
    this.loginErrorMessageSubject.next('');
  }
  
  setLogoutMessage(message: string) {
    this.logoutMessageSubject.next(message);
    this.clearMessageAfterDelay(this.logoutMessageSubject);
  }

  setLogoutMessageSuccess(message: string) {
    this.logoutMessageSuccessSubject.next(message);
    this.clearMessageAfterDelay(this.logoutMessageSuccessSubject);
  }
  
  clearLogoutMessage() {
    this.logoutMessageSubject.next('');
  }

  setErrorMessageTours(message: string) {
    this.errorMessageSubject.next(message);
    this.clearMessageAfterDelay(this.errorMessageSubject);
  }

  setSuccessMessageTours(message: string) {
    this.saveMessageSubject.next(message);
    this.clearMessageAfterDelay(this.saveMessageSubject);
  }

  setDeleteMessage(message: string) {
    this.deleteMessageSubject.next(message);
    this.clearMessageAfterDelay(this.deleteMessageSubject);
  }
  
  
  private clearMessageAfterDelay(subject: Subject<string>): void {
    setTimeout(() => {
      subject.next('');
    }, 1000);
  }
}
