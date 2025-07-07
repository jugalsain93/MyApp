// src/app/features/dashboard/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ddlValues ,KeyValue,HtmlEmailTemplateDto} from '../models/common-use-model';
import { environment } from '../../environments/environment';
const apiBaseUrl = environment.apiBaseUrl;

@Injectable({ providedIn: 'root' })
export class CommonService {

  constructor(private http: HttpClient) {}

  getRegions(): Observable<ddlValues[]> {
    return this.http.get<ddlValues[]>(`${apiBaseUrl}/Location/RegionList`);
  }

  getCountries(regionId: number): Observable<ddlValues[]> {
    //debugger;
    return this.http.get<ddlValues[]>(`${apiBaseUrl}/Location/CountryList/${regionId}`);
  }

  getGenders(): Observable<ddlValues[]> {
    return this.http.get<ddlValues[]>(`${apiBaseUrl}/MasterDdl/GenderList`);
  }

  getAgeGroups(): Observable<ddlValues[]> {
    return this.http.get<ddlValues[]>(`${apiBaseUrl}/MasterDdl/AgeGroupList`);
  }

  
    getCountriesAll(): Observable<ddlValues[]> {
      return this.http.get<ddlValues[]>(`${apiBaseUrl}/MasterDdl/CountryList`);
    }
  
    
      getEmailTemplate(key: string): Observable<HtmlEmailTemplateDto> {
        return this.http.get<HtmlEmailTemplateDto>(`${apiBaseUrl}/MasterDdl/HtmlEmailTemplate/${key}`);
      }
    
      getSubscriptions(countryId: number): Observable<KeyValue[]> {
        return this.http.get<KeyValue[]>(`${apiBaseUrl}/MasterDdl/MembershipSubscriptionList/${countryId}`);
      }

       getUserProfile(): Observable<any> {
         // debugger;
          return this.http.get<any>(`${apiBaseUrl}/User/Profile`);
        }
    
}
