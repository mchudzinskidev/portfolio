import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';
import { FullscreenOpenableDirective } from '../../../core/directives/fullscreenOpenable';

@Component({
  selector: 'app-fdd',
  imports: [FullscreenOpenableDirective],
  templateUrl: './fdd.html',
  styleUrl: './fdd.scss',
})
export class Fdd {
  public content = inject(Content).getHome();
}
