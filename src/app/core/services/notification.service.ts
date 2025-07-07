// core/notification.service.ts
import { Injectable, signal } from '@angular/core';

interface Notification {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private counter = 0;
  notifications = signal<Notification[]>([]); // Exposed as readonly signal

  show(message: string, type: Notification['type'] = 'info') {
    const id = ++this.counter;
    const newNote: Notification = { message, type, id };

    this.notifications.update(n => [...n, newNote]);

    // Auto-remove after 4s
    setTimeout(() => {
      this.notifications.update(n => n.filter(note => note.id !== id));
    }, 4000);
  }

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  showWarning(message: string) {
    this.show(message, 'warning');
  }

  showInfo(message: string) {
    this.show(message, 'info');
  }
}
