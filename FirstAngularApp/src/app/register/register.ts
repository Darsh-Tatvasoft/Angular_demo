import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { confirmPasswordValidator } from '../validators/validators';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  registerFields = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      errors: {
        required: 'Name is required.',
        minlength: 'Name must be at least 2 characters.',
      },
      validators: [Validators.required, Validators.minLength(2)],
    },
    {
      key: 'mobileNumber',
      label: 'Mobile Number',
      type: 'text',
      errors: {
        required: 'Mobile number is required.',
        pattern: 'Digits only.',
        maxlength: 'Maximum 15 digits.',
      },
      validators: [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[0-9]+$'),
      ],
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      errors: {
        required: 'Email is required.',
        email: 'Enter a valid email.',
      },
      validators: [Validators.required, Validators.email],
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      errors: {
        required: 'Password is required.',
        pattern:
          'Must include uppercase, lowercase, number, and special character.',
        minlength: 'Min 8 characters.',
      },
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ],
    },
    {
      key: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      errors: {
        required: 'Confirm Password is required.',
        passwordMismatch: 'Passwords do not match.',
      },
      validators: [Validators.required],
    },
  ];

  objectKeys = Object.keys;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const controls: any = {};
    this.registerFields.forEach((field) => {
      controls[field.key] = ['', field.validators];
    });

    this.registerForm = this.fb.group(controls, {
      validators: confirmPasswordValidator,
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        if (res.result) {
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          this.cookieService.set('JwtToken', token, 7);
          this.cookieService.set('RefreshToken', refreshToken, 7);

          setTimeout(() => {
            this.router.navigate(['/library/books'], { replaceUrl: true });
          }, 200);
          console.log('Registration successful:', res.message);
        } else {
          console.error('Registration failed:', res.message);
        }
      },
      error: (err) => {
        const message = err?.error?.message || 'Unknown error';
        console.error('Registration failed:', message);
      },
    });
  }

  getFirstErrorMessage(
    controlName: string,
    errorMessages: { [key: string]: string }
  ): string | null {
    const controlErrors = this.registerForm.get(controlName)?.errors;
    if (!controlErrors) return null;

    const errorKey = Object.keys(controlErrors)[0]; // get first error
    return errorMessages[errorKey] || null;
  }
}
