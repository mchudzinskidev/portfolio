import { Component } from '@angular/core';
import { Window as WindowComponent } from '../window/window';
import { Window } from '../../core/models/window';

@Component({
  selector: 'app-desktop',
  imports: [WindowComponent],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss',
})
export class Desktop {
  public clock: string = '00:00';
  public windows: Window[] = [];
  public showFullscreenIndicator: boolean = false;
  constructor(){
    this.updateClock();
    setInterval(() => { this.updateClock(); }, 1000);
  }
  private updateClock(): void{
    const now = new Date();
    this.clock = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }
  public newWindow(): void{
    this.windows.push({
      title: 'goodbye world ' + this.clock,
      posX: 64,
      posY: 64,
      innerH: 192,
      innerW: 256 + 64,
      zIndex: this.windows.length > 0 ? Math.max(...this.windows.map(win => win.zIndex)) + 1 : 1,
      isFullscreen: false,
      isMinimized: false,
    });
  }
  public focusCallback(id: number): void {
    const maxIndex = Math.max(...this.windows.map(win => win.zIndex));
    const currentIndex = this.windows[id].zIndex;
    this.windows[id].isMinimized = false;
    if (currentIndex === maxIndex) {
      return;
    }
    for (const win of this.windows) {
      if (win.zIndex > currentIndex) {
        win.zIndex--;
      }
    }
    this.windows[id].zIndex = maxIndex;
  }
  public dragIndCallback(top: boolean): void{
    this.showFullscreenIndicator = top;
  }
  public closeWindowCallback(id: number): void{
    this.windows = this.windows.filter((win, index) => index !== id);
  }
}
