import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  form: AbstractControl
): ValidationErrors | null => {
  const password = form.get('password')?.value;
  const confirmPasswordControl = form.get('confirmPassword');

  if (!confirmPasswordControl) return null;

  const confirmPassword = confirmPasswordControl.value;

  if (password !== confirmPassword) {
    confirmPasswordControl.setErrors({ passwordMismatch: true });
  } else {
    if (confirmPasswordControl.hasError('passwordMismatch')) {
      const errors = { ...confirmPasswordControl.errors };
      delete errors['passwordMismatch'];
      if (Object.keys(errors).length === 0) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors(errors);
      }
    }
  }

  return null;
};
