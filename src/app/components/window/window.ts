import {
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  output,
  ViewChild,
} from '@angular/core';

import { Window as WindowModel } from '../../core/models/window';
import { NgComponentOutlet } from '@angular/common';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

@Component({
  selector: 'app-window',
  imports: [NgComponentOutlet],
  templateUrl: './window.html',
  styleUrl: './window.scss',
})
export class Window {

  public window = input.required<WindowModel>();
  public index = input.required<number>();
  public isFocused = input.required<boolean>();

  public focused = output<number>();
  public draggedToTop = output<boolean>();
  public closed = output<number>();

  public iconUrl = computed(() => `url(./media/${this.window().icon})`);

  private dragging = false;
  private startMouseX = 0;
  private startMouseY = 0;
  private startWindowX = 0;
  private startWindowY = 0;
  private oldPosX = 0;
  private oldPosY = 0;
  private resizing = false;
  private resizeDirection!: ResizeDirection;
  private startWidth = 0;
  private startHeight = 0;
  private readonly minWidth = 288;
  private readonly minHeight = 192;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  public showScrollTopBtn = false;

  public startDrag(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    this.dragging = true;
    this.startMouseX = event.clientX;
    this.startMouseY = event.clientY;
    this.oldPosX = this.window().posX;
    this.oldPosY = this.window().posY;
    if (this.window().isFullscreen) {
      this.window().isFullscreen = false;
      const ratio = event.clientX / window.innerWidth;
      this.window().posX = event.clientX - this.window().innerW * ratio;
    }
    this.startWindowX = this.window().posX;
    this.startWindowY = this.window().posY;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  @HostListener('document:pointermove', ['$event'])
  public onPointerMove(event: PointerEvent): void {
    if (this.dragging) {
      this.window().posX = this.startWindowX + event.clientX - this.startMouseX;
      const newPosY = this.startWindowY + event.clientY - this.startMouseY;
      if (newPosY <= 0) {
        this.draggedToTop.emit(true);
        this.window().posY = 0;
      } else {
        this.draggedToTop.emit(false);
        this.window().posY = newPosY;
      }
      return;
    }
    if (!this.resizing) {
      return;
    }
    const dx = event.clientX - this.startMouseX;
    const dy = event.clientY - this.startMouseY;
    switch (this.resizeDirection) {
      case 'e':
        this.window().innerW = Math.max(this.minWidth, this.startWidth + dx);
        break;
      case 's':
        this.window().innerH = Math.max(this.minHeight, this.startHeight + dy);
        break;
      case 'se':
        this.window().innerW = Math.max(this.minWidth, this.startWidth + dx);
        this.window().innerH = Math.max(this.minHeight, this.startHeight + dy);
        break;
      case 'w': {
        const width = Math.max(this.minWidth, this.startWidth - dx);
        this.window().innerW = width;
        this.window().posX = this.startWindowX + this.startWidth - width;
        break;
      }
      case 'n': {
        const height = Math.max(this.minHeight, this.startHeight - dy);
        this.window().innerH = height;
        this.window().posY = this.startWindowY + this.startHeight - height;
        break;
      }
      case 'nw': {
        const width = Math.max(this.minWidth, this.startWidth - dx);
        const height = Math.max(this.minHeight, this.startHeight - dy);
        this.window().innerW = width;
        this.window().innerH = height;
        this.window().posX = this.startWindowX + this.startWidth - width;
        this.window().posY = this.startWindowY + this.startHeight - height;
        break;
      }
      case 'ne': {
        const height = Math.max(this.minHeight, this.startHeight - dy);
        this.window().innerW = Math.max(this.minWidth, this.startWidth + dx);
        this.window().innerH = height;
        this.window().posY = this.startWindowY + this.startHeight - height;
        break;
      }
      case 'sw': {
        const width = Math.max(this.minWidth, this.startWidth - dx);
        this.window().innerW = width;
        this.window().innerH = Math.max(this.minHeight, this.startHeight + dy);
        this.window().posX = this.startWindowX + this.startWidth - width;
        break;
      }
    }
  }
  @HostListener('document:pointerup')
  public stopDrag(): void {
    this.dragging = false;
    this.resizing = false;
    this.draggedToTop.emit(false);
    if (this.window().posY === 0 && !this.resizing) {
        this.window().posX = 0;
        this.window().isFullscreen = true;
    } else {
        this.oldPosX = this.window().posX;
        this.oldPosY = this.window().posY;
    }
  }
  public startResize(event: PointerEvent, direction: ResizeDirection): void {
    if (event.button !== 0 || this.window().isFullscreen) {
      return;
    }
    this.resizing = true;
    this.resizeDirection = direction;
    this.startMouseX = event.clientX;
    this.startMouseY = event.clientY;
    this.startWindowX = this.window().posX;
    this.startWindowY = this.window().posY;
    this.startWidth = this.window().innerW;
    this.startHeight = this.window().innerH;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
  }
  public minimizeCallback(): void{
    this.window().isMinimized = true;
  }
  public fullscreenClick(): void{
    if(this.window().isFullscreen){
      this.window().posX = this.oldPosX;
      this.window().posY = this.oldPosY;
      this.window().isFullscreen = false;
    }else{
      this.window().posX = 0;
      this.window().posY = 0;
      this.window().isFullscreen = true;
    }
  }
  public closeClick(): void{
    this.closed.emit(this.index());
  }
  public toggleFullscreen(event: MouseEvent): void {
    event.stopPropagation();
    this.dragging = false;
    this.window().posX = 0;
    this.window().posY = 0;
    this.window().isFullscreen = true;
  }
  public onScroll(): void {
    this.showScrollTopBtn = this.scrollContainer.nativeElement.scrollTop > 0;
  }
  public scrollToTop(): void {
    this.scrollContainer.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}