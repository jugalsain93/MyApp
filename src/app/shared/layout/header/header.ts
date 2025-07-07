// src/app/features/dashboard/layout/header/header.ts
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private authservice: AuthService, private router: Router) {}

  logout() {
    this.authservice.logout();
  }
  
}
