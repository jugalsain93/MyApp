import { Component } from '@angular/core';
import { MainLayout } from '../layout/main-layout';
import { LoadingService } from '../../core/services/loading.service';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports :[],
  template: `
      <div style="text-align:center;">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for doesn't exist.</p>
      </div>`
})
export class NotFound {
  constructor( private loadingService : LoadingService){};

  

  async ngOnInit() {
    this.loadingService.setContentLoading(false);
  }

  
}


