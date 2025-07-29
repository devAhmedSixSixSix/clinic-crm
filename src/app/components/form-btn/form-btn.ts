import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-btn',
  imports: [],
  templateUrl: './form-btn.html',
  styleUrl: './form-btn.css'
})
export class FormBTN {
  @Input() text!: string
}
