import { Component, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IBL_QUERY_ID,
  IBL_QUERY_METHOD,
  IblParams,
  IblQueryBody,
} from '../api/api.model';
import { atLeastOneCheckboxCheckedValidator } from './validators/report-type.validator';
import { substringLengthValidator } from './validators/substrings.validator';
import { atLeastOneTruthyValidator } from './validators/at-least-one-truthy.validator';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class FormComponent {
  formPayloadEmitter = output<IblQueryBody>();
  attemptedSubmit = false;

  form = new FormGroup({
    reportTypes: new FormGroup({
      metar: new FormControl<boolean>(false),
      sigmet: new FormControl<boolean>(false),
      taf: new FormControl<boolean>(false),
    }, { validators: atLeastOneCheckboxCheckedValidator()}),
    stations: new FormControl<string>('', [substringLengthValidator(4)]),
    countries: new FormControl<string>('', [substringLengthValidator(2)]),
  }, { validators: atLeastOneTruthyValidator(['stations', 'countries']) });

  submit() {
    if (this.form.invalid) {
      this.attemptedSubmit = true;
      return;
    }
    let payload: IblQueryBody = {
      id: IBL_QUERY_ID,
      method: IBL_QUERY_METHOD,
      params: [],
    };
    if (this.form.value.stations) {
      payload.params.push(this.createParam('stations'));
    }
    if (this.form.value.countries) {
      payload.params.push(this.createParam('countries'));
    }
    this.formPayloadEmitter.emit(payload);
  }

  private createParam(key: 'stations' | 'countries'): IblParams {
    return {
      id: this.form.value[key] ?? '',
      reportTypes: this.constructReportTypes(),
      [key]: this.form.value[key]?.toUpperCase().split(' '),
    };
  }

  private constructReportTypes() {
    const reportTypes = [];
    const { metar, sigmet, taf } = this.form.value.reportTypes as {
      metar: boolean;
      sigmet: boolean;
      taf: boolean;
    };
    if (metar) {
      reportTypes.push('METAR');
    }
    if (sigmet) {
      reportTypes.push('SIGMET');
    }
    if (taf) {
      reportTypes.push('TAF');
    }
    return reportTypes;
  }
}
