import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const router = inject(Router);

  const isLoginCall = req.url.includes('/Login/Web/Login')||req.url.includes('/Dashboard/MembershipSummaryList/List');
  const isVerifyCall = req.url.includes('/Login/Web/LoginVerify');

  // 🔄 Always reset first
  loadingService.setFullPageLoading(false);
  loadingService.setContentLoading(false);

  if (isLoginCall) {
    // No loader for login
  } else if (isVerifyCall) {
    loadingService.setFullPageLoading(true); // ✅ Full-page loader for verify
  } else {
    loadingService.setContentLoading(true); // ✅ Content loader for all other APIs
  }

  return next(req).pipe(
    finalize(() => {
      console.log('✅ finalize reached for:', req.url);
      loadingService.setFullPageLoading(false);
      loadingService.setContentLoading(false);
    })
  );
};
