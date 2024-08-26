import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function substringLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null; // Don't validate empty values to allow for optional fields
    }

    const isValid = value.split(' ').every(substring => substring.length === length);
    return isValid ? null : { substringLength: { requiredLength: length } };
  };
}