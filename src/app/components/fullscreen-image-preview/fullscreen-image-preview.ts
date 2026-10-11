import { Component, HostListener, inject } from '@angular/core';
import { FullscreenOpenableService } from '../../core/services/fullscreen-openable-service';

@Component({
  selector: 'app-fullscreen-image-preview',
  imports: [],
  templateUrl: './fullscreen-image-preview.html',
  styleUrl: './fullscreen-image-preview.scss',
})
export class FullscreenImagePreview {
  readonly imageService = inject(FullscreenOpenableService);
  close(): void {
    this.imageService.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
