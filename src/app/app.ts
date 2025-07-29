import { Component, Input, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideMenu } from './components/side-menu/side-menu';
import { TopMenu } from './components/top-menu/top-menu';
import { NgIf } from '@angular/common';
import { SideMenuResponsive } from './components/side-menu-responsive/side-menu-responsive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenu, TopMenu, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    currentUrl = '';

  hideNavRoutes = ['/signup', '/', "/forget-password"];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  shouldHideNavbar(): boolean {
    return this.hideNavRoutes.includes(this.currentUrl);
  }

}
