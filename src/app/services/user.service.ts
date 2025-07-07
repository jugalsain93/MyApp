// src/app/features/dashboard/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
const apiBaseUrl = environment.apiBaseUrl;

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
   // debugger;
    return this.http.get<any>(`${apiBaseUrl}/User/Profile`);
  }
}
