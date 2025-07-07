import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const exemptUrls = [
  `${environment.apiBaseUrl}/Login/Web/Login`,
  `${environment.apiBaseUrl}/Login/Web/LoginVerify`
];

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken');
  const isExempt = exemptUrls.some(url => req.url.includes(url));

  if (!token || isExempt) {
    return next(req); // ✅ no error thrown
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
