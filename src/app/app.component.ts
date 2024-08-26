import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ForecastNetworkService } from '../api/api.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { IblQueryBody, IblResponse } from '../api/api.model';
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormComponent, DisplayComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  forecastApiService = inject(ForecastNetworkService);
  result$: Observable<IblResponse> | null = null;

  onFormSubmit(payload: IblQueryBody) {
    this.result$ = this.forecastApiService.requestForecast(payload);
  }
}
