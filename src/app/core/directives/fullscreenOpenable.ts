import { Directive, ElementRef, inject } from '@angular/core';
import { FullscreenOpenableService } from '../services/fullscreen-openable-service';

@Directive({
  selector: 'img[fullscreenOpenable]',
  standalone: true,
  host: {
    '(click)': 'onUserClick()',
    '[style.cursor]': '"pointer"',
  },
})
export class FullscreenOpenableDirective {
  private readonly el = inject(ElementRef<HTMLImageElement>).nativeElement;
  private readonly fullscreenService = inject(FullscreenOpenableService);

  onUserClick(): void {
    this.fullscreenService.open({
      src: this.el.currentSrc ?? this.el.src,
      alt: this.el.alt,
    });
  }
}