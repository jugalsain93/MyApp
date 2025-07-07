import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { MembershipRegisterDto,ViewMembershipDto,PaginationDto } from '../models/blockradiance-model';
import { ViewUserProfile ,HttpResponse,KeyValue,HtmlEmailTemplateDto} from '../models/common-use-model';
import { environment } from '../../environments/environment';
const apiBaseUrl = environment.apiBaseUrl;

environment
@Injectable({ providedIn: 'root' })
export class BlockRadianceService {
  
  constructor(private http: HttpClient) {}


  getTicketingPartners(): Observable<KeyValue[]> {
    return this.http.get<KeyValue[]>(`${apiBaseUrl}/Membership/TicketingPartnerList/Business`);
  }

  submitMembership(data: MembershipRegisterDto): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${apiBaseUrl}/Membership/BlockRadianceMembership/Registration`, data);
  }

  getMembershipList(filter: string, pageNumber: number, pageSize: number): Observable<PaginationDto> {
  return this.http.get<PaginationDto>(
    `${apiBaseUrl}/Membership/BlockRadianceMembership/List/${filter}?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
}


  getMembershipDetails(id: number): Observable<ViewMembershipDto> {
    return this.http.get<ViewMembershipDto>(`${apiBaseUrl}/Membership/GetByMembership/${id}`);
  }
 
   downloadMembershipExcel(filter: string): Observable<Blob> {
    const mockData = 'MembershipId,Company,Plan\n123,Acme Corp,Gold\n456,XYZ Inc,Silver';
    const blob = new Blob([mockData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Simulate Observable<Blob> like an HTTP response
    return of(blob);
  }
}

// return this.http.get(`${apiBaseUrl}/Membership/ExportExcel?filter=${filter}`, {
//   responseType: 'blob'
// });




    // console.error('input pm', this.listItem); // Should show on failure