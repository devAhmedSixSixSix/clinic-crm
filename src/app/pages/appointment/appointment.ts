import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DayPilot, DayPilotModule } from '@daypilot/daypilot-lite-angular';
import Swal from 'sweetalert2';

type EventType = 'Appointment' | 'Meeting';

interface EventData {
  id: string;
  text: string;
  type: EventType;
  start: string | DayPilot.Date;
  end: string | DayPilot.Date;
}

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, DayPilotModule],
  templateUrl: './appointment.html',
  styleUrls: ['./appointment.css'],
})
export class Appointment implements OnInit {
  events: EventData[] = [];

  config: any = {
    viewType: "Week",
    businessBeginsHour: 9,
    businessEndsHour: 17,

    onTimeRangeSelecting: (args: any) => {
      const now = DayPilot.Date.now();
      if (args.start < now) {
        args.preventDefault();
      }
    },

    onTimeRangeSelected: async (args: any) => {
      const now = DayPilot.Date.now();
      if (args.start < now) {
        await Swal.fire('Error', 'You cannot add events in the past.', 'error');
        return;
      }

      const { value: name } = await Swal.fire({
        title: 'Enter event name',
        input: 'text',
        inputLabel: 'Event Name',
        inputPlaceholder: 'Type here...',
        showCancelButton: true,
      });

      if (!name) return;

      const { value: type } = await Swal.fire({
        title: 'Select Event Type',
        input: 'select',
        inputOptions: {
          Appointment: 'Appointment',
          Meeting: 'Meeting'
        },
        inputPlaceholder: 'Select a type',
        showCancelButton: true,
      });

      if (!type || (type !== 'Appointment' && type !== 'Meeting')) {
        await Swal.fire('Invalid type', "Please select 'Appointment' or 'Meeting'.", 'error');
        return;
      }

      const newEvent: EventData = {
        id: DayPilot.guid(),
        text: `${type}: ${name}`,
        type,
        start: args.start,
        end: args.end,
      };

      this.events = [...this.events, newEvent];
      this.saveEvents();
    },

    onEventClick: async (args: any) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        html: `<div class="swal-text">Delete event: <strong>"${args.e.data.text}"</strong>?</div>`,
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        this.events = this.events.filter(e => e.id !== args.e.data.id);
        this.saveEvents();
        await Swal.fire('Deleted!', 'The event has been deleted.', 'success');
      }
    },
  };

  ngOnInit(): void {
    this.loadEvents();
  }

  saveEvents(): void {
    localStorage.setItem('appointments', JSON.stringify(this.events));
  }

  loadEvents(): void {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      this.events = JSON.parse(stored);
    }
  }
}
