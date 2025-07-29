import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
  imports: []
})
export class BarChart implements AfterViewInit {
totalPatients: number = 0;

  ngAfterViewInit(): void {
    const ctx = document.getElementById('barCanvas') as HTMLCanvasElement;

    // Get patients from localStorage
    const patientsRaw = localStorage.getItem('patients');
    const patients = patientsRaw ? JSON.parse(patientsRaw) : [];

    this.totalPatients = patients.length; // ✅ Store the count

    // Chart code (unchanged)
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIndex = new Date().getMonth();

    const backgroundColors = labels.map((_, index) =>
      index === currentMonthIndex ? '#0067FF' : '#ebf3ff'
    );

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Sales',
            data: [0, 0, 0, 0, 0, 0, this.totalPatients, this.totalPatients, 0, 0, 0, 0],
            backgroundColor: backgroundColors,
            borderRadius: 100,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: '#E5E5E5'
            },
            ticks: {
              color: '#999'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#737373'
            }
          }
        }
      }

    });
  }
}