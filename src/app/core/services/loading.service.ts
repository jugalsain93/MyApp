// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class LoadingService {
//   private fullPageLoading = new BehaviorSubject<boolean>(false);
//   public fullPageLoading$ = this.fullPageLoading.asObservable();

//   private contentLoading = new BehaviorSubject<boolean>(false);
//   public contentLoading$ = this.contentLoading.asObservable();

//   setFullPageLoading(value: boolean) {
//     this.fullPageLoading.next(value);
//     console.log('FULL:', value); // ✅ Add here
//     document.body.style.overflow = value ? 'hidden' : '';
//   }

//   setContentLoading(value: boolean) {
//     this.contentLoading.next(value);
//     console.log('CONTENT:', value); // ✅ Add here
//   }
// }

// File: core/services/loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private fullPageLoading = new BehaviorSubject<boolean>(false);
  public fullPageLoading$ = this.fullPageLoading.asObservable();

  private contentLoading = new BehaviorSubject<boolean>(false);
  public contentLoading$ = this.contentLoading.asObservable();

  setFullPageLoading(value: boolean): void {
    this.fullPageLoading.next(value);
   // console.log('FULL:', value);
    document.body.style.overflow = value ? 'hidden' : ''; // Prevent scrolling when full loader is active
  }

  setContentLoading(value: boolean): void {
    this.contentLoading.next(value);
    //console.log('CONTENT:', value);
  }
}
