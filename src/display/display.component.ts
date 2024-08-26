import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IblResponse } from '../api/api.model';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.component.html',
})
export class DisplayComponent {
  weatherForecast = input<IblResponse | null>();
}
