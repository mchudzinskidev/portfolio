import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';

@Component({
  selector: 'app-starling',
  imports: [],
  templateUrl: './starling.html',
  styleUrl: './starling.scss',
})
export class Starling {
  public content = inject(Content).getHome();
}
