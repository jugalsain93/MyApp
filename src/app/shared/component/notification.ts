// shared/components/notification.component.ts
import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-wrapper">
      <div *ngFor="let note of notes()" [ngClass]="['alert-toast', 'alert-' + note.type]">
        {{ note.message }}
      </div>
    </div>
  `,
  styleUrls: ['./notification.css'] // optional for styling
})
export class NotificationComponent {
  notes = computed(() => this.notificationService.notifications());

  constructor(private notificationService: NotificationService) {}
}
