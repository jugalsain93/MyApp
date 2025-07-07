import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';
import { LoginPayload } from '../../models/login-model ';
import { MenuService } from './menu.service';

const apiBaseUrl = environment.apiBaseUrl;


@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwtToken';
  private loggedIn = signal(!!localStorage.getItem(this.tokenKey));
  isAuthenticated = computed(() => this.loggedIn());

  isLoggedIn(): boolean {
  return !!this.getToken(); // or: return this.isAuthenticated(); if using signal/computed
  }


  tempToken: string = '';
  
  constructor(private http: HttpClient, private router: Router,
    private sessionService: SessionService ,private menuService: MenuService ) { }

  // Step 1: Login with username/password
  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${apiBaseUrl}/Login/Web/Login`, payload);
  }

  // Step 2: Verify PIN with tempToken
  verifyPin(payload: LoginPayload): Observable<any> {
    return this.http.post(`${apiBaseUrl}/Login/Web/LoginVerify`, payload);
  }

  // Store final JWT
  setJwtToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.loggedIn.set(true);
  }

  // Get JWT
  getToken(): string | null {
    
    return localStorage.getItem(this.tokenKey);

  }

  
  
logout(): void {
  debugger;
  localStorage.removeItem(this.tokenKey);
  this.sessionService.stopTracking();  // ✅ use the injected instance
  this.menuService.clearMenuCache();
  this.router.navigate(['/login']);
  this.loggedIn.set(false); // update signal
}


}
