// src/app/core/session.service.ts
import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Injector } from '@angular/core'; // 👈 add this
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private inactivityTimeout: any;
  private absoluteTimeout: any;

  private INACTIVITY_LIMIT = 10 * 60 * 1000;
  private SESSION_LIMIT = 30 * 60 * 1000;

  private router = inject(Router);
  private ngZone = inject(NgZone);
  private injector = inject(Injector);

  startTracking(): void {
    const authService = this.injector.get(AuthService);

    // 🚫 Don't start tracking if not logged in or token is missing
    if (!authService.isLoggedIn()) {
      console.log('Session tracking not started: user is not logged in.');
      return;
    }

    this.resetInactivityTimer();
    this.setAbsoluteTimer();

    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event =>
      window.addEventListener(event, this.resetInactivityTimer.bind(this))
    );
  }


  private resetInactivityTimer(): void {
    clearTimeout(this.inactivityTimeout);
    this.ngZone.runOutsideAngular(() => {
      this.inactivityTimeout = setTimeout(() => {
        this.logout('Session expired due to inactivity');
      }, this.INACTIVITY_LIMIT);
    });
  }

  private setAbsoluteTimer(): void {
    clearTimeout(this.absoluteTimeout);
    this.ngZone.runOutsideAngular(() => {
      this.absoluteTimeout = setTimeout(() => {
        this.logout('Session expired (30 min limit)');
      }, this.SESSION_LIMIT);
    });
  }

  stopTracking(): void {
    clearTimeout(this.inactivityTimeout);
    clearTimeout(this.absoluteTimeout);
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event =>
      window.removeEventListener(event, this.resetInactivityTimer.bind(this))
    );
  }

  private logout(reason: string): void {
    console.warn(reason);
    alert(reason);

    const authService = this.injector.get(AuthService); // 👈 avoid circular constructor injection
    if (authService.isLoggedIn()) {
      authService.logout();  // ✅ Only call if still logged in
    }
  }
}
