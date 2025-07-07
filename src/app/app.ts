// src/app/app.ts
import { Component, OnInit, signal } from '@angular/core';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router,NavigationStart,  NavigationEnd, NavigationCancel,NavigationError } from '@angular/router';
import { NotificationComponent } from './shared/component/notification';
import { LoadingSpinnerComponent } from './shared/loader/loading-spinner';
import { SessionService } from './core/services/session.service';
import { LoadingService } from './core/services/loading.service';
import { Navigation } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NotificationComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  showLoader = signal(true);

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private loadingService :LoadingService
    
  ) { }

  ngOnInit(): void {
    this.sessionService.startTracking();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && !event.url.includes('login')) {
        this.loadingService.setContentLoading(true);
      } 
    });


  }
}
