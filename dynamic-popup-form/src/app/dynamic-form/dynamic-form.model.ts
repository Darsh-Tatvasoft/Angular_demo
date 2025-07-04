import { ValidatorFn } from '@angular/forms';

export interface DynamicFormField {
  name: string; // form control name
  label: string; // label to display
  type: 'text' | 'number' | 'email' | 'password'; // input type
  value?: any; // default value
  validators?: ValidatorFn[]; // validators to apply
}
