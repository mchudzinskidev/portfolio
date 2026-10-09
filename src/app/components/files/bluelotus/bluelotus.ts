import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';

@Component({
  selector: 'app-bluelotus',
  imports: [],
  templateUrl: './bluelotus.html',
  styleUrl: './bluelotus.scss',
})
export class Bluelotus {
  public content = inject(Content).getHome();
}
