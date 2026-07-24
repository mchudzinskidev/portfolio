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
  constructor(){
    this.updateClock();
    setInterval(() => { this.updateClock(); }, 1000);
  }
  private updateClock() {
    const now = new Date();
    this.clock = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }
  public newWindow(){
    this.windows.push({
      title: 'goodbye world ' + this.clock,
      posX: 64,
      posY: 64,
      innerH: 192,
      innerW: 256,
      }
    );
  }
}
