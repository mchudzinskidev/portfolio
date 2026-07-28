import { Component, HostListener, inject } from '@angular/core';
import { Window as WindowComponent } from '../window/window';
import { StartMenu } from '../start-menu/start-menu';
import { Window } from '../../core/models/window';
import { DesktopIcon as DesktopIconModel } from '../../core/models/desktop-icon';
import { DesktopIcon } from '../desktop-icon/desktop-icon';
import { FileExplorer } from '../file-explorer/file-explorer';
import { About } from '../about/about';
import { Settings } from '../settings/settings';
import { Browser } from '../browser/browser';
import { Terminal } from '../terminal/terminal';
import { RebootDialog } from '../reboot-dialog/reboot-dialog';
import { WindowType } from '../../core/types/window-types';
import { DirectoryNode, FileSystem } from '../../core/services/file-system';

@Component({
  selector: 'app-desktop',
  imports: [WindowComponent, StartMenu, DesktopIcon],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss',
})
export class Desktop {
  private fs = inject(FileSystem);
  public clock: string = '00:00';
  public windows: Window[] = [];
  public icons: DesktopIconModel[] = [{
    title: 'LinkedIn',
    gridPosX: 1,
    gridPosY: 1,
    icon: 'in',
    gridSize: 128,
    wType: WindowType.in,
    selected: false,
  },{
    title: 'projects',
    gridPosX: 1,
    gridPosY: 2,
    icon: 'dir',
    gridSize: 128,
    wType: WindowType.projects,
    selected: false,
  }];
  public selection = {
    visible: false,
    startX: 0,
    startY: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0
  };
  public showFullscreenIndicator: boolean = false;
  public showStartMenu: boolean = false;
  public wType = WindowType;
  public dragging = false;
  public dragStartX = 0;
  public dragStartY = 0;
  public initialIconPositions = new Map<number, { x: number, y: number }>();
  constructor(){
    this.updateClock();
    setInterval(() => { this.updateClock(); }, 1000);
  }
  @HostListener('document:pointerdown')
  public closeMenu(): void {
    this.showStartMenu = false;
  }
  @HostListener('document:pointerup')
  public stopDrag(): void {
    this.icons.forEach(icon => icon.selected = false);
  }
  private updateClock(): void{
    const now = new Date();
    this.clock = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }
  public newWindow(wType: WindowType, inputs: Record<string, unknown> = {}): void{
    this.showStartMenu = false;
    let component;
    let icon;
    let title;
    let innerHeight = 288;
    let innerWidth = 512;
    let posX = 64;
    let posY = 64;
    switch(wType){
      case WindowType.dir: {
        component = FileExplorer;
        icon = 'dir';
        title = 'File Explorer';
        inputs = {
          openBrowserClicked: (path: string) => { this.newWindow(WindowType.net, { path: path }); },
          openTerminalClicked: (cmd: string, startNode: DirectoryNode) => { this.newWindow(WindowType.term, { startCmd: cmd, startNode: startNode }); },
        };
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
      case WindowType.in: {
        window.open('https://www.linkedin.com/in/marcin-chudzi%C5%84ski-5a2058230/', '_blank')?.focus();
        return;
      }
      case WindowType.projects: {
        component = FileExplorer;
        icon = 'dir';
        title = 'File Explorer';
        inputs = {
          currentNode: this.fs.resolvePath('home/desktop/projects', this.fs.getFs()),
          openBrowserClicked: (path: string) => { this.newWindow(WindowType.net, { path: path }); },
          openTerminalClicked: (cmd: string, startNode: DirectoryNode) => { this.newWindow(WindowType.term, { startCmd: cmd, startNode: startNode }); },
        };
        break;
      }
      case WindowType.net: {
        component = Browser;
        icon = 'net';
        title = 'Browser';
        break;
      }
      case WindowType.off: {
        component = RebootDialog;
        icon = 'off';
        title = 'Dialog';
        innerHeight = 192;
        innerWidth = 512;
        posX = (window.innerWidth - 512) / 2;
        posY = (window.innerHeight - 192) / 2;
        break;
      }
    }
    this.windows.push({
      title: title,
      posX: posX,
      posY: posY,
      innerH: innerHeight,
      innerW: innerWidth,
      zIndex: this.windows.length > 0 ? Math.max(...this.windows.map(win => win.zIndex)) + 1 : 1,
      isFullscreen: false,
      isMinimized: false,
      icon: icon,
      component: component,
      inputs: inputs,
    });
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
  public toggleStartMenu(): void{
    this.showStartMenu = !this.showStartMenu;
  }
  public selectionStart(event: PointerEvent): void {
    if (event.target !== event.currentTarget)
        return;
    this.selection.visible = true;
    this.selection.startX = event.clientX;
    this.selection.startY = event.clientY;
    this.selection.left = event.clientX;
    this.selection.top = event.clientY;
    this.selection.width = 0;
    this.selection.height = 0;
  }
  public selectionMove(event: PointerEvent): void {
    if (!this.selection.visible){
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    this.selection.left = Math.min(this.selection.startX, x);
    this.selection.top = Math.min(this.selection.startY, y);
    this.selection.width = Math.abs(x - this.selection.startX);
    this.selection.height = Math.abs(y - this.selection.startY);
  }
  public selectionEnd(event: PointerEvent): void {
    if (!this.selection.visible){
      return;
    }
    event.stopPropagation();
    this.selection.visible = false;
    const right = this.selection.left + this.selection.width;
    const bottom = this.selection.top + this.selection.height;
    this.icons.forEach(icon => {
      const iconCenterX = icon.gridPosX * icon.gridSize + icon.gridSize / 2;
      const iconCenterY = icon.gridPosY * icon.gridSize + icon.gridSize / 2;
      icon.selected =
        iconCenterX >= this.selection.left &&
        iconCenterX <= right &&
        iconCenterY >= this.selection.top &&
        iconCenterY <= bottom;
    });
  }
  public startDrag(event: PointerEvent, index: number): void {
    event.preventDefault();
    const icon = this.icons[index];
    if (!icon.selected) {
      this.icons.forEach(i => i.selected = false);
      icon.selected = true;
    }
    this.dragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.initialIconPositions.clear();
    this.icons.forEach((ic, id) => {
      if(ic.selected){
        this.initialIconPositions.set(id, {
          x: ic.gridPosX,
          y: ic.gridPosY
        });
      }
    });
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }
  public drag(event: PointerEvent): void {
    if (!this.dragging){
      return;
    }
    const dx = event.clientX - this.dragStartX;
    const dy = event.clientY - this.dragStartY;
    const grid = this.icons[0].gridSize;
    this.initialIconPositions.forEach((pos, id) => {
      const newX = pos.x * grid + dx;
      const newY = pos.y * grid + dy;
      this.icons[id].gridPosX = Math.round(newX / grid);
      this.icons[id].gridPosY = Math.round(newY / grid);
    });
  }
  public stopDrag2(event: PointerEvent): void {
    if(!this.dragging){
      return;
    }
    const collision = this.icons
      .filter((icon, id) => this.initialIconPositions.has(id))
      .some(icon => this.hasCollision(icon) || this.isOutsideScreen(icon));
    if (collision) {
      this.initialIconPositions.forEach((pos, id) => {
        this.icons[id].gridPosX = pos.x;
        this.icons[id].gridPosY = pos.y;
      });
    }
    this.dragging = false;
    for(let key of this.initialIconPositions.keys()){
      setTimeout(() => {
        this.icons[key].selected = true;
      });
    }
    this.initialIconPositions.clear();
  }
  private hasCollision(icon: DesktopIconModel): boolean {
    return this.icons.some((other, id) =>
      other !== icon &&
      !this.initialIconPositions.has(id) && // ignore dragged icons
      other.gridPosX === icon.gridPosX &&
      other.gridPosY === icon.gridPosY
    );
  }
  private isOutsideScreen(icon: DesktopIconModel): boolean {
    return icon.gridPosX < 0 || icon.gridPosY < 0;
  }
}
