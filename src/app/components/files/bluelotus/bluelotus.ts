import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';
import { FullscreenOpenableDirective } from '../../../core/directives/fullscreenOpenable';

@Component({
  selector: 'app-bluelotus',
  imports: [FullscreenOpenableDirective],
  templateUrl: './bluelotus.html',
  styleUrl: './bluelotus.scss',
})
export class Bluelotus {
  public content = inject(Content).getHome();
}
