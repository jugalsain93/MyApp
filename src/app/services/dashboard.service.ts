// src/app/features/dashboard/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ddlValues } from '../models/common-use-model';
import { environment } from '../../environments/environment';
const apiBaseUrl = environment.apiBaseUrl;

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(private http: HttpClient) {}
  
  getDashboardData(filter: string): Observable<ddlValues[]> {
    return this.http.get<ddlValues[]>(`${apiBaseUrl}/Dashboard/MembershipSummaryList/List/${filter}`);
  }

}
