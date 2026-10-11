import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';
import { FullscreenOpenableDirective } from '../../../core/directives/fullscreenOpenable';

@Component({
  selector: 'app-homelab',
  imports: [FullscreenOpenableDirective],
  templateUrl: './homelab.html',
  styleUrl: './homelab.scss',
})
export class Homelab {
  public content = inject(Content).getHome();
}
