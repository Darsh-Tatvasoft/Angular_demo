// import { Component, Input, OnInit } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-form-field',
//   templateUrl: './form-field.component.html',
//   styleUrls: ['./form-field.component.scss'],
// })
// export class FormFieldComponent implements OnInit {
//   @Input() label = 'Field';
//   @Input() type:
//     | 'text'
//     | 'email'
//     | 'password'
//     | 'number'
//     | 'select'
//     | 'textarea' = 'text';
//   @Input() placeholder = '';
//   @Input() required = false;
//   @Input() minLength?: number;
//   @Input() maxLength?: number;
//   @Input() options: string[] = [];

//   control!: FormControl;

//   ngOnInit(): void {
//     const validators = [];

//     if (this.required) validators.push(Validators.required);
//     if (this.minLength) validators.push(Validators.minLength(this.minLength));
//     if (this.maxLength) validators.push(Validators.maxLength(this.maxLength));
//     if (this.type === 'email') validators.push(Validators.email);

//     this.control = new FormControl('', validators);
//   }

//   get errorMessage(): string {
//     if (this.control.hasError('required')) return `${this.label} is required.`;
//     if (this.control.hasError('email'))
//       return `Please enter a valid email address.`;
//     if (this.control.hasError('minlength'))
//       return `${this.label} must be at least ${this.minLength} characters.`;
//     if (this.control.hasError('maxlength'))
//       return `${this.label} must be at most ${this.maxLength} characters.`;
//     return '';
//   }
// }


// form-field.component.ts
import {
  Component, Input, Output, EventEmitter,
  forwardRef, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor,
  NG_VALIDATORS, Validator, AbstractControl,
  ValidationErrors, FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="form-field" [class.invalid]="hasError">
      <label *ngIf="label" [for]="id">{{ label }}</label>

      <div class="input-container">
        <input
          #input
          [id]="id"
          [type]="type"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          (input)="onInput($event)"
          (blur)="onBlur()"
        />

        <ng-content select="[suffix]"></ng-content>
      </div>

      <div *ngIf="hasError" class="error-messages">
        <div *ngFor="let error of errorMessages" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-field {
      margin-bottom: 1rem;
      width: 100%;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .input-container {
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      transition: border-color 0.3s;
    }

    .input-container input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
    }

    .form-field.invalid .input-container {
      border-color: #e74c3c;
    }

    .error-messages {
      margin-top: 0.5rem;
      color: #e74c3c;
      font-size: 0.875rem;
    }

    .error-message {
      margin-top: 0.25rem;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ]
})
export class FormFieldComponent implements ControlValueAccessor, Validator, AfterViewInit {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'date' = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() pattern?: string | RegExp;
  @Input() min?: number;
  @Input() max?: number;

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>;

  value: string = '';
  errorMessages: string[] = [];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit() {
    if (this.inputRef) {
      this.inputRef.nativeElement.value = this.value;
    }
  }

  get hasError(): boolean {
    return this.errorMessages.length > 0;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
    this.validate();
  }

  onBlur(): void {
    this.onTouched();
    this.validate();
  }

  writeValue(value: string): void {
    this.value = value || '';
    if (this.inputRef) {
      this.inputRef.nativeElement.value = this.value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control?: AbstractControl): ValidationErrors | null {
    this.errorMessages = [];

    if (this.required && !this.value) {
      this.errorMessages.push('This field is required');
    }

    if (this.minLength && this.value.length < this.minLength) {
      this.errorMessages.push(`Minimum length is ${this.minLength} characters`);
    }

    if (this.maxLength && this.value.length > this.maxLength) {
      this.errorMessages.push(`Maximum length is ${this.maxLength} characters`);
    }

    if (this.type === 'email' && this.value && !this.isValidEmail(this.value)) {
      this.errorMessages.push('Please enter a valid email address');
    }

    if (this.pattern) {
      const regex = typeof this.pattern === 'string' ? new RegExp(this.pattern) : this.pattern;
      if (this.value && !regex.test(this.value)) {
        this.errorMessages.push('Invalid format');
      }
    }

    if (this.type === 'number') {
      const numValue = Number(this.value);
      if (this.min !== undefined && numValue < this.min) {
        this.errorMessages.push(`Minimum value is ${this.min}`);
      }
      if (this.max !== undefined && numValue > this.max) {
        this.errorMessages.push(`Maximum value is ${this.max}`);
      }
    }

    return this.hasError ? { errors: this.errorMessages } : null;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}