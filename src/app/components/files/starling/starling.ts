import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';
import { FullscreenOpenableDirective } from '../../../core/directives/fullscreenOpenable';

@Component({
  selector: 'app-starling',
  imports: [FullscreenOpenableDirective],
  templateUrl: './starling.html',
  styleUrl: './starling.scss',
})
export class Starling {
  public content = inject(Content).getHome();
}
