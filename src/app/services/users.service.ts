import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error.message);
        return throwError(() => new Error('Login failed with status: ' + error.status));
      })
    );
  }

  logout(username: string,): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/logout`, { username }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Logout error:', error.message);
        return throwError(() => new Error('Logout failed with status: ' + error.status));
      })
    );
  }
}