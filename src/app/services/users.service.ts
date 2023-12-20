import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}
  isLoggedIn: boolean = false;
  
  login(user: User): Observable<User>  {
    this.isLoggedIn = true;
    console.log('Login successful. isLoggedIn:', this.isLoggedIn);
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  logout(): Observable<User>  {
    this.isLoggedIn = false;
    return this.http.post<User>(`${this.apiUrl}/logout`, {});
   
  }

  isLogged(): boolean {
    return this.isLoggedIn;
  }
  
  
}







