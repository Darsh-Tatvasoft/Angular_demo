import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { FormFieldComponent } from '../app/shared/form-field/form-field.component';

const meta: Meta<FormFieldComponent> = {
  title: 'Components/FormField',
  component: FormFieldComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(FormsModule, ReactiveFormsModule)],
    }),
  ],
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl(
        { value: '', disabled: args.disabled },
        args.required ? Validators.required : null
      ),
    },
    template: `
      <app-form-field
        [id]="id"
        [label]="label"
        [type]="type"
        [placeholder]="placeholder"
        [required]="required"
        [minLength]="minLength"
        [maxLength]="maxLength"
        [pattern]="pattern"
        [min]="min"
        [max]="max"
        [formControl]="formControl"
      ></app-form-field>

      <div style="margin-top: 2rem;">
        <h3>Current Value:</h3>
        <pre>{{ formControl.value }}</pre>
        <h3>Validation Status:</h3>
        <pre>{{ formControl.errors | json }}</pre>
      </div>
    `,
  }),
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date'],
    },
    valueChange: { action: 'valueChange' },
  },
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Text: Story = {
  args: {
    id: 'text-field',
    label: 'Text Input',
    type: 'text',
    placeholder: 'Enter some text...',
    disabled: false
  }
};

export const RequiredText: Story = {
  args: {
    id: 'required-text-field',
    label: 'Required Text Input',
    type: 'text',
    placeholder: 'This field is required',
    required: true,
    disabled: false
  }
};

export const Email: Story = {
  args: {
    id: 'email-field',
    label: 'Email Input',
    type: 'email',
    placeholder: 'Enter your email',
    required: true
  }
};

export const Password: Story = {
  args: {
    id: 'password-field',
    label: 'Password Input',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    minLength: 8
  }
};

export const Number: Story = {
  args: {
    id: 'number-field',
    label: 'Number Input',
    type: 'number',
    placeholder: 'Enter a number between 1 and 100',
    min: 1,
    max: 100
  }
};

export const WithPattern: Story = {
  args: {
    id: 'pattern-field',
    label: 'Phone Number',
    type: 'text',
    placeholder: 'Enter phone number (XXX-XXX-XXXX)',
    pattern: '^\\d{3}-\\d{3}-\\d{4}$'
  }
};

export const WithCustomValidation: Story = {
  args: {
    id: 'custom-validation-field',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter username (4-12 chars, letters and numbers only)',
    minLength: 4,
    maxLength: 12,
    pattern: '^[a-zA-Z0-9]*$'
  }
};