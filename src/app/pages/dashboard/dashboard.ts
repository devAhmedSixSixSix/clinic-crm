import { Component } from '@angular/core';
import { Datepicker } from '../../components/datepicker/datepicker';
import { Table } from "../../components/table/table";
import { DoughnutChart } from "../../components/doughnut-chart/doughnut-chart";
import { DashboardCard } from '../../components/dashboard-card/dashboard-card';
import { BarChart } from '../../components/bar-chart/bar-chart';

@Component({
  selector: 'app-dashboard',
  imports: [Datepicker, Table, DoughnutChart, DashboardCard, BarChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
userFirstName: string | null = null;
userLastName: string | null = null;

ngOnInit() {
  this.userFirstName = localStorage.getItem('userFirstName');
  this.userLastName = localStorage.getItem('userLastName');
}
}
