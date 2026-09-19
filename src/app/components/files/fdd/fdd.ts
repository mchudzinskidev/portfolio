import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';

@Component({
  selector: 'app-fdd',
  imports: [],
  templateUrl: './fdd.html',
  styleUrl: './fdd.scss',
})
export class Fdd {
  public content = inject(Content).getHome();
}
