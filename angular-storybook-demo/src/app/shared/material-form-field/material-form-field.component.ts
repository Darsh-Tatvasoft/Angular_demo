import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-material-form-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <input
        matInput
        [type]="type"
        [placeholder]="placeholder"
        [formControl]="formControl"
        [min]="min"
        [max]="max"
        [attr.pattern]="pattern"
        [attr.minlength]="minLength"
        [attr.maxlength]="maxLength"
      />
      <mat-error *ngIf="formControl.hasError('required')"
        >This field is required.</mat-error
      >
      <mat-error *ngIf="formControl.hasError('email')"
        >Please enter a valid email.</mat-error
      >
      <mat-error *ngIf="formControl.hasError('minlength')">
        Minimum
        {{ formControl.getError('minlength').requiredLength }} characters
        required.
      </mat-error>
      <mat-error *ngIf="formControl.hasError('maxlength')">
        Maximum
        {{ formControl.getError('maxlength').requiredLength }} characters
        allowed.
      </mat-error>
      <mat-error *ngIf="formControl.hasError('pattern')">
        Invalid format.
      </mat-error>
      <mat-error *ngIf="formControl.hasError('min')">
        Minimum value is {{ min }}.
      </mat-error>
      <mat-error *ngIf="formControl.hasError('max')">
        Maximum value is {{ max }}.
      </mat-error>
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 1rem;
      }
      ::ng-deep
        .mat-form-field-appearance-outline.mat-form-field-invalid
        .mat-form-field-outline {
        color: #e74c3c !important;
        border-color: #e74c3c !important;
      }
      ::ng-deep .mat-error {
        color: #e74c3c !important;
      }
    `,
  ],
})
export class MaterialFormFieldComponent {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'date' = 'text';
  @Input() placeholder = '';
  @Input() min?: number;
  @Input() max?: number;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() pattern?: string;
  @Input({ required: true }) formControl!: FormControl;
}
