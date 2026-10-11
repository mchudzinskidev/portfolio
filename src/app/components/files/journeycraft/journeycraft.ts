import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';
import { FullscreenOpenableDirective } from '../../../core/directives/fullscreenOpenable';

@Component({
  selector: 'app-journeycraft',
  imports: [FullscreenOpenableDirective],
  templateUrl: './journeycraft.html',
  styleUrl: './journeycraft.scss',
})
export class Journeycraft {
  public content = inject(Content).getHome();
}
