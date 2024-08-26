import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export function atLeastOneTruthyValidator(controlNames: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const isValid = controlNames.some((name) => !!formGroup.get(name)?.value);
    return isValid ? null : { atLeastOneTruthy: true };
  };
}
