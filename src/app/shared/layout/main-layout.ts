import { Component } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { LoadingSpinnerComponent } from '../loader/loading-spinner';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [Header,Sidebar,RouterOutlet,LoadingSpinnerComponent],
  styleUrls: ['./main-layout.css'],
  templateUrl: './main-layout.html',

})
export class MainLayout {}
