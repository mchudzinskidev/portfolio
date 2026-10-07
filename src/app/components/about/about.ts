import { Component, inject } from '@angular/core';
import { Content } from '../../core/services/content';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  public cs = inject(Content);
}
