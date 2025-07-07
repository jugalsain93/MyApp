import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { catchError, throwError } from 'rxjs';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('✅ HttpErrorInterceptor is active'); // Should show even for successful calls

  const router = inject(Router);
  const notification = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('❌ Interceptor caught an error:', error); // Should show on failure

      if (error.status === 0) {
        notification.show('Server is unreachable.', 'error');
      } else if (error.status === 401) {
        router.navigate(['/login']);
      } else {
        const msg = error.error?.message || error.statusText || 'An unexpected error occurred';
        notification.show(msg, 'error');
      }

      return throwError(() => error);
    })
  );
};
