import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';

@Component({
  selector: 'app-bsodmaker',
  imports: [],
  templateUrl: './bsodmaker.html',
  styleUrl: './bsodmaker.scss',
})
export class Bsodmaker {
  public content = inject(Content).getHome();
}
