import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  mainMenus: any[] = [];
  childMenus: { [key: number]: any[] } = {};
  isAuthenticated: boolean = false;
  collapsedMenus: { [key: number]: boolean } = {};

  toggleMenu(menuId: number): void {
    this.collapsedMenus[menuId] = !this.collapsedMenus[menuId];
  }

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) { }


  normalizeLink(link: string): string {
    if (!link.startsWith('/')) {
      return '/' + link;
    }
    return link;
  }


  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();

    if (!this.isAuthenticated) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return;
    }


    // Step 1: Get main menu
    this.menuService.getMainMenuList().subscribe(mainMenus => {
      //console.log('Main Menus:', mainMenus);
      this.mainMenus = mainMenus;
      for (const menu of mainMenus) {
        this.collapsedMenus[menu.id] = true; // All collapsed initially
      }


      this.menuService.getChildMenuList().subscribe(allChildren => {
        //console.log('Child Menus:', allChildren);
        for (const child of allChildren) {
          const parentId = child.parentMenuId; // Use correct key from your API
          if (!this.childMenus[parentId]) {
            this.childMenus[parentId] = [];

          }
          this.childMenus[parentId].push(child);
        }
      });
    });
  }
}
