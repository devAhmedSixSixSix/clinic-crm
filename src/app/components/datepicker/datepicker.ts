import { ChangeDetectionStrategy, Component, OnInit, model, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppointmentCard } from "../appointment-card/appointment-card";

export interface Appointment {
  id: string;
  type: string;
  title: string;
  time: string;
}

@Component({
  selector: 'app-datepicker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, AppointmentCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.css'
})
export class Datepicker implements OnInit {
  selected = model<Date | null>(null);
  appointments = signal<Appointment[]>([]);

  ngOnInit(): void {
    const raw = localStorage.getItem('appointments');
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      const mapped = data.map((item: any) => ({
        type: item.type?.toLowerCase() || '',
        title: item.text || '',
        time: this.formatTime(item.start, item.end)
      }));
      this.appointments.set(mapped);
    } catch (e) {
      console.error('Error parsing appointments:', e);
    }
  }

  private formatTime(start: string, end: string): string {
    const toTime = (s: string) => {
      const d = new Date(s);
      return d.toTimeString().slice(0, 5); // "HH:mm"
    };
    return `${toTime(start)} - ${toTime(end)}`;
  }
}
