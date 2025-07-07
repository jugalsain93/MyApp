// src/app/shared/components/loading-spinner.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
 templateUrl: 'loading-spinner.html',
  styleUrls : ['loading-spinner.css']
})
export class LoadingSpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}
