import { Component, inject } from '@angular/core';
import { Content } from '../../../core/services/content';

@Component({
  selector: 'app-homelab',
  imports: [],
  templateUrl: './homelab.html',
  styleUrl: './homelab.scss',
})
export class Homelab {
  public content = inject(Content).getHome();
}
