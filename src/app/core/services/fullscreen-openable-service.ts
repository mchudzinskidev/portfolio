import { Injectable, signal } from '@angular/core';

export interface FullscreenImage {
  src: string;
  alt: string;
}

@Injectable({
  providedIn: 'root',
})
export class FullscreenOpenableService {
  readonly image = signal<FullscreenImage | null>(null);
  
  open(image: FullscreenImage): void {
    this.image.set(image);
  }

  close(): void {
    this.image.set(null);
  }
}
