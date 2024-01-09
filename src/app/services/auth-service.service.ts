  import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private tokenKey = 'token';
    private usernameKey = 'username';
    private isadminKey = 'isadmin';
    public isLoggedIn = false;
    public loggedInStatusChange = new Subject<boolean>();

    constructor() {}

    setIsAdmin(isAdmin: boolean) {
      localStorage.setItem(this.isadminKey, isAdmin.toString()); 
    }
  
    getIsAdmin(): boolean {
      const isAdminStr = localStorage.getItem(this.isadminKey);
      return isAdminStr === 'true'; 
    }  
    clearAdminStatus(): void {
      localStorage.removeItem(this.isadminKey);
    }
    
    saveToken(token: string): void {
      localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
    saveUsername(username: string): void {
      localStorage.setItem(this.usernameKey, username);
    }

    getUsername(): string | null {
      return localStorage.getItem(this.usernameKey);
    }
    clearStorage(): void {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.usernameKey);
    }

    hasToken(): boolean {
      const token = localStorage.getItem('token');
      return !!token; 
    }
    setIsLoggedIn(value: boolean): void {
      this.isLoggedIn = value;
      this.loggedInStatusChange.next(value);
    }
    
    
  }
