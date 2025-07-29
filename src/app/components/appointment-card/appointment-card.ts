import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-card.html',
  styleUrl: './appointment-card.css'
})

export class AppointmentCard {
  @Input() appointmentType!: string
  @Input() appointmentTitle!: string;
  @Input() appointmentTime!: string;

  get statusStyles() {
    switch (this.appointmentType.toLowerCase()) {
      case "meeting":
        return {
          border: "border-[#fc7d5d]",
          background: "bg-[#fc7d5d]"
        }
      case "appointment":
      default:
        return {
          border: "border-[#0067FF]",
          background: "bg-[#0067FF]"
        }
    }
  }
}
