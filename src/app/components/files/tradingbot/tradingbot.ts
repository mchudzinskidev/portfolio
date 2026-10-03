import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';

@Component({
  selector: 'app-tradingbot',
  imports: [],
  templateUrl: './tradingbot.html',
  styleUrl: './tradingbot.scss',
})
export class Tradingbot {
  public content = inject(Content).getHome();
}
