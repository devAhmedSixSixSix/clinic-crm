import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideMenu } from './components/side-menu/side-menu';
import { TopMenu } from './components/top-menu/top-menu';
import { NgIf } from '@angular/common';
import { AuthService } from './core/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideMenu, TopMenu, NgIf, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentUrl = '';
  hideNavRoutes = ['/signup', '/', '/forget-password'];

  constructor(private router: Router, public auth: AuthService) {
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
