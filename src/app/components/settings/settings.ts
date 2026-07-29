import { Component, inject } from '@angular/core';
import { Content } from '../../core/services/content';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  public content = inject(Content).getHome().settings;
  get isFullscreen() {
    return document.fullscreenElement;
  }
  public toggleFullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : document.querySelector('body')?.requestFullscreen();
  }
}
