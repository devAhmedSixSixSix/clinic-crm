import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css'
})
export class DashboardCard implements OnInit {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() total!: number;
  @Input() items: string[] = [];
  @Input() bg!: string;

  ngOnInit(): void {
    if (!this.total) {
      const patientsRaw = localStorage.getItem('patients');
      const patients = patientsRaw ? JSON.parse(patientsRaw) : [];
      this.total = patients.length;
    }
  }
}
