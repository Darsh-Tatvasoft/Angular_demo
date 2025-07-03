import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
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
          [formControl]="formControl"
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
  styles: [
    `
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
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
})
export class FormFieldComponent
  implements ControlValueAccessor, Validator, AfterViewInit
{
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
  @Input() formControl!: FormControl;

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
    if (isDisabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
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
      const regex =
        typeof this.pattern === 'string'
          ? new RegExp(this.pattern)
          : this.pattern;
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
