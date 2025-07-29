import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-title-and-description',
  imports: [],
  templateUrl: './custom-title-and-description.html',
  styleUrl: './custom-title-and-description.css'
})
export class CustomTitleAndDescription {
  @Input() title!: string
  @Input() description!: string
}
