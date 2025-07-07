// src/app/core/core.module.ts
import { inject, Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@Injectable({ providedIn: 'root' })
export class CoreModule {
  constructor() {
    // Optional initialization logic
    inject(AuthService); // ensure it's initialized
    inject(AuthGuard);
  }
}
