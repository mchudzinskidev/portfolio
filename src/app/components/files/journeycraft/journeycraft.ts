import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';

@Component({
  selector: 'app-journeycraft',
  imports: [],
  templateUrl: './journeycraft.html',
  styleUrl: './journeycraft.scss',
})
export class Journeycraft {
  public content = inject(Content).getHome();
}
