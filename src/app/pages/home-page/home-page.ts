import { Component, inject } from '@angular/core';
import { Content } from '../../core/services/content';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  readonly content = inject(Content).getHome();
}
