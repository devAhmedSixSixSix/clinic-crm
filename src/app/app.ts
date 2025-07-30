import { Component } from '@angular/core';
import { Router, RouterOutlet, Route } from '@angular/router';
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
  styleUrl: './app.css',
})
export class App {
  constructor(public router: Router, public auth: AuthService) {}

  shouldHideNavbar(): boolean {
    const url = this.router.url;

    // Define routes where navbar should be hidden
    const hideRoutes = ['/', '/signup', '/forget-password'];

    // Check if current route exists in route config
    const isKnownRoute = this.router.config.some(route => {
      // Skip wildcards or redirects
      if (!route.path || route.path === '**' || route.redirectTo) return false;

      const path = '/' + route.path;
      return url.startsWith(path);
    });

    const is404 = !isKnownRoute;

    return hideRoutes.includes(url) || is404;
  }
}
