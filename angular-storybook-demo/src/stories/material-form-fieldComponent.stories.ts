import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MaterialFormFieldComponent } from '../app/shared/material-form-field/material-form-field.component';

const meta: Meta<MaterialFormFieldComponent> = {
  title: 'Components/MaterialFormField',
  component: MaterialFormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<MaterialFormFieldComponent>;

export const Text: Story = {
  args: {
    label: 'Text Input',
    type: 'text',
    placeholder: 'Enter text',
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  },
};

export const Email: Story = {
  args: {
    label: 'Email Input',
    type: 'email',
    placeholder: 'Enter email',
    formControl: new FormControl('', [Validators.required, Validators.email]),
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  },
};

export const Number: Story = {
  args: {
    label: 'Number Input',
    type: 'number',
    placeholder: 'Enter number',
    min: 1,
    max: 10,
    formControl: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
  },
};

export const WithPattern: Story = {
  args: {
    label: 'Phone Number',
    type: 'text',
    placeholder: 'XXX-XXX-XXXX',
    pattern: '^\\d{3}-\\d{3}-\\d{4}$',
    formControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\\d{3}-\\d{3}-\\d{4}$/),
    ]),
  },
};
