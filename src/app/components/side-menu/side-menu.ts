import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.css']
})
export class SideMenu {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
