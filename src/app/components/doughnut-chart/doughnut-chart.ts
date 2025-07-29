import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.css'
})
export class DoughnutChart implements AfterViewInit {
  totalCount: number = 0;

  ngAfterViewInit(): void {
    const ctx = document.getElementById('doughnutCanvas') as HTMLCanvasElement;

    // Step 1: Parse gender data from localStorage
    const stored = localStorage.getItem('patients');
    let maleCount = 0;
    let femaleCount = 0;

    if (stored) {
      try {
        const patients = JSON.parse(stored);
        patients.forEach((p: any) => {
          const gender = p.patientInfo?.gender?.toLowerCase();
          if (gender === 'male') maleCount++;
          else if (gender === 'female') femaleCount++;
        });
      } catch (e) {
        console.error('Invalid patient data in localStorage:', e);
      }
    }

    const chartData = [maleCount, femaleCount];
    this.totalCount = maleCount + femaleCount;

    // Step 2: Create the chart
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Men's", "Women's"],
        datasets: [
          {
            label: 'Count',
            data: chartData,
            backgroundColor: ['#0067FF', '#cce1ff'],
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#737373',
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 8,
              boxHeight: 8,
              padding: 15,
              font: {
                size: 14,
                family: 'Arial',
              },
            },
          },
        },
      },
    });
  }
}
