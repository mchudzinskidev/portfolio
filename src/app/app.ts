import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bios as BiosService } from './core/services/bios';
import { Bios } from './components/bios/bios';
import { FullscreenImagePreview } from './components/fullscreen-image-preview/fullscreen-image-preview';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Bios, FullscreenImagePreview],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public biosService = inject(BiosService);
}
