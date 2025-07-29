import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-satus-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-satus-card.html',
  styleUrl: './table-satus-card.css'
})
export class TableSatusCard {
  @Input() status: string | undefined;

  get statusStyles() {
    switch (this.status?.toLowerCase()) {
      case 'healthy':
        return {
          text: 'text-[#6CD185]',
          bg: 'bg-[#f7fcf9]',
          border: 'border-[#edfaf1]',
          dot: 'bg-[#6CD185]',
          dotBorder: 'border-[#6CD185]',
        };
      case 'hospital':
        return {
          text: 'text-[#FC7D5D]',
          bg: 'bg-[#fffbfa]',
          border: 'border-[#edfaf1]',
          dot: 'bg-[#FC7D5D]',
          dotBorder: 'border-[#FC7D5D]',
        };
      case 'consulting':
      default:
        return {
          text: 'text-[#0067FF]',
          bg: 'bg-[#f5f9ff]',
          border: 'border-[#edfaf1]',
          dot: 'bg-[#0067FF]',
          dotBorder: 'border-[#0067FF]',
        };
    }
  }
}
