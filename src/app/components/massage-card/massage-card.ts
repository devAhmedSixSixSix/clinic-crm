import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-massage-card',
  imports: [RouterLink],
  templateUrl: './massage-card.html',
  styleUrl: './massage-card.css'
})
export class MassageCard {
isMobile = window.innerWidth <= 768;

}
