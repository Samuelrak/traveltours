import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../entities/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'; 
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:5000';
  logoutMessage: string | null = null;
  loginSuccessMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router 
  ) {}

  login(username: string, password: string): Observable<User> {
    const user: User = {
      username: username,
      password: password,
      token: '',
      isadmin: false,
    };

    return this.http.post<User>(`${this.apiUrl}/login`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Login failed. Please check your credentials';
  
        if (error.status === 0) {
          errorMessage = 'Server is not responding. Please try again later.';
        }
  
        this.messageService.setLoginErrorMessage(errorMessage);
  
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  onLogin(username: string, password: string) {
    if (!username.trim() || !password.trim() || password === '' || username === '') {
      this.messageService.setLoginErrorMessage('Please fill username and password');
      return;
    }
    this.login(username, password).subscribe(
      (response: User) => {
        this.authService.saveToken(response.token);
        this.authService.saveUsername(response.username);
        this.authService.setIsAdmin(response.isadmin);
        this.messageService.setIsLoggedIn(true);
        this.messageService.setLoginSuccessMessage('Login successful');
        this.router.navigate(['']); 
      },
    );
  }

  logout(): Observable<User> {
    const username = this.authService.getUsername();
    const token = this.authService.getToken();
    const isadmin = this.authService.getIsAdmin();

    return this.http.post<User>(`${this.apiUrl}/logout`, { username, token, isadmin }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Logout failed. Please check your credentials';
        if (error.status === 0) {
          errorMessage = 'Server is not available. Please try again later';
        }

        this.messageService.setLoginErrorMessage(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  onLogout() {
    if (this.authService.hasToken()) {
      this.logout().subscribe(
        () => {
          this.authService.clearStorage();
          this.authService.clearAdminStatus();
          this.messageService.setIsLoggedIn(false);
          this.router.navigate(['/']); 

          this.messageService.setLogoutMessageSuccess('Logout successful.'); 
        },
        (error) => {
          console.error('Logout failed', error);
          this.messageService.setLogoutMessage('Logout failed. Please try again.'); 
        }
      );
    } else {
      this.messageService.setLogoutMessage('Missing token.'); 
    }
  }
}
