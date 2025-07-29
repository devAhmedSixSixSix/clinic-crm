import { Component, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth'; // Adjust the path if needed
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-menu-responsive',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-responsive.html',
  styleUrl: './side-menu-responsive.css'
})
export class SideMenuResponsive {
  @Input() isOpen = false;

  private _eref = inject(ElementRef);
  private renderer = inject(Renderer2);
  private auth = inject(AuthService);
  private router = inject(Router);

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen && !this._eref.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  closeSidebar() {
    this.isOpen = false;
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.isOpen = false;
    
      this.router.navigate(['/']);
    } catch (err: any) {
     
      console.error('Sign out error:', err);
    }
  }
}
