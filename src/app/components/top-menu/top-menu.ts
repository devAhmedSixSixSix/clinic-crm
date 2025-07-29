import { Component, OnInit } from '@angular/core';
import { SideMenuResponsive } from "../side-menu-responsive/side-menu-responsive";

@Component({
  selector: 'app-top-menu',
  imports: [SideMenuResponsive],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.css'
})
export class TopMenu implements OnInit {
  isSidebarOpen = false;

  userFirstName: string | null = null;
  userLastName: string | null = null;
  accountType: string | null = null;
  avatar: string | null = null;

  ngOnInit(): void {
    this.userFirstName = localStorage.getItem('userFirstName');
    this.userLastName = localStorage.getItem('userLastName');
    this.accountType = localStorage.getItem('accountType');
    this.avatar = localStorage.getItem('avatar');
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
