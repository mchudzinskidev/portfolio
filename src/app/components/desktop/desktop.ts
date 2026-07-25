import { Component, HostListener } from '@angular/core';
import { Window as WindowComponent } from '../window/window';
import { StartMenu } from '../start-menu/start-menu';
import { Window } from '../../core/models/window';
import { FileExplorer } from '../file-explorer/file-explorer';
import { About } from '../about/about';
import { Settings } from '../settings/settings';
import { Terminal } from '../terminal/terminal';

export enum WindowType { me, dir, gear, term }

@Component({
  selector: 'app-desktop',
  imports: [WindowComponent, StartMenu],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss',
})
export class Desktop {
  public clock: string = '00:00';
  public windows: Window[] = [];
  public showFullscreenIndicator: boolean = false;
  public showStartMenu: boolean = false;
  public wType = WindowType;
  constructor(){
    this.updateClock();
    setInterval(() => { this.updateClock(); }, 1000);
  }
  @HostListener('document:pointerdown')
  public closeMenu(): void {
    this.showStartMenu = false;
  }
  private updateClock(): void{
    const now = new Date();
    this.clock = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }
  public newWindow(wType: WindowType): void{
    let component;
    let icon;
    let title;
    switch(wType){
      case WindowType.dir: {
        component = FileExplorer;
        icon = 'dir';
        title = 'File Explorer';
        break;
      }
      case WindowType.me: {
        component = About;
        icon = 'me';
        title = 'About';
        break;
      }
      case WindowType.gear: {
        component = Settings;
        icon = 'gear';
        title = 'Settings';
        break;
      }
      case WindowType.term: {
        component = Terminal;
        icon = 'term';
        title = 'Terminal';
        break;
      }
    }
    this.windows.push({
      title: title,
      posX: 64,
      posY: 64,
      innerH: 192,
      innerW: 288,
      zIndex: this.windows.length > 0 ? Math.max(...this.windows.map(win => win.zIndex)) + 1 : 1,
      isFullscreen: false,
      isMinimized: false,
      icon: icon,
      component: component,
    });
    this.showStartMenu = false;
  }
  public getMaxWindowZindex(): number{
    return Math.max(...this.windows.map(win => win.zIndex));
  }
  public focusCallback(id: number): void {
    const maxIndex = this.getMaxWindowZindex();
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
  public toggleStartMenu(){
    this.showStartMenu = !this.showStartMenu;
  }
}
