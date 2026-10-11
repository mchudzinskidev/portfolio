import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';
import { FullscreenOpenableDirective } from '../../../core/directives/fullscreenOpenable';

@Component({
  selector: 'app-bsodmaker',
  imports: [FullscreenOpenableDirective],
  templateUrl: './bsodmaker.html',
  styleUrl: './bsodmaker.scss',
})
export class Bsodmaker {
  public content = inject(Content).getHome();
}
