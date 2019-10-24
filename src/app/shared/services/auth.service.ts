import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  User: any;
  Token: string;
  /* Store the URL so we can redirect after logging in */
  redirectUrl: string;
  isLoggedIn = false;

  constructor() {
    if (localStorage.getItem('Token') !== null) {
      this.isLoggedIn = true;
    }
  }

  login(User: any, Token: string): Observable<boolean> {
    if (!User || !Token) { return of(this.isLoggedIn); }
    this.User = User, this.Token = Token;

    localStorage.setItem('User', User);
    localStorage.setItem('Token', Token);
    return of(this.isLoggedIn = true);
  }

  logout(): void {
    localStorage.removeItem('User');
    localStorage.removeItem('Token');
    this.isLoggedIn = false;
  }
}