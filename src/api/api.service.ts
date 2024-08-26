import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  FORECAST_API,
  IblQueryBody,
  IblResponse,
  IblResult,
} from './api.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastNetworkService {
  readonly http = inject(HttpClient);

  requestForecast(payload: IblQueryBody): Observable<IblResponse> {
    return this.http.post<any>(FORECAST_API, payload).pipe(
      map((response: IblResponse) => ({
        ...response,
        result: response.result?.sort((a: IblResult, b: IblResult) => {
          const stationComparison = a.stationId.localeCompare(b.stationId);
          if (stationComparison !== 0) {
            return stationComparison;
          }
          return new Date(a.reportTime).getTime() - new Date(b.reportTime).getTime();
        }),
      }))
    );
  }
}
