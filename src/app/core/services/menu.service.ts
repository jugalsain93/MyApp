import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const apiBaseUrl = environment.apiBaseUrl;

@Injectable({ providedIn: 'root' })
export class MenuService {
  private mainMenusCache: any[] | null = null;
  private childMenusCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  // ✅ Get main menu with caching
  getMainMenuList(): Observable<any[]> {
    if (this.mainMenusCache !== null) {
      return of(this.mainMenusCache); // ✅ Safe because it's no longer nullable here
    }

    return this.http.get<any[]>(`${apiBaseUrl}/Secure/SideMenu/MainMenuList`).pipe(
      tap(data => this.mainMenusCache = data)
    );
  }

  // ✅ Get child menu with caching
  getChildMenuList(): Observable<any[]> {
    if (this.childMenusCache !== null) {
      return of(this.childMenusCache); // ✅ Safe
    }

    return this.http.get<any[]>(`${apiBaseUrl}/Secure/SideMenu/ChildMenuList`).pipe(
      tap(data => this.childMenusCache = data)
    );
  }

  // ✅ Clear cache (e.g., on logout)
  clearMenuCache(): void {
    this.mainMenusCache = null;
    this.childMenusCache = null;
  }
}
