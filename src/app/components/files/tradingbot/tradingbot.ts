import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';
import { FullscreenOpenableDirective } from '../../../core/directives/fullscreenOpenable';

@Component({
  selector: 'app-tradingbot',
  imports: [FullscreenOpenableDirective],
  templateUrl: './tradingbot.html',
  styleUrl: './tradingbot.scss',
})
export class Tradingbot {
  public content = inject(Content).getHome();
}
