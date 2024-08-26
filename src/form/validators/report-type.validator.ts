import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneCheckboxCheckedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const controls = formGroup.controls;
    const isAtLeastOneChecked = Object.keys(controls).some(
      (key) => controls[key].value === true
    );

    return isAtLeastOneChecked ? null : { atLeastOneChecked: true };
  };
}
