import { Component, inject } from '@angular/core';
import { Content } from '../../core/services/content';
import { Desktop } from '../../components/desktop/desktop';

@Component({
  selector: 'app-home-page',
  imports: [Desktop],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  readonly content = inject(Content).getHome();
}
