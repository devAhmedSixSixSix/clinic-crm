import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  templateUrl: './custom-input.html',
  styleUrls: ['./custom-input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInput implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type: string = 'text';

  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: any) {
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
  }
}
