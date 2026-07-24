import {
  Component,
  HostListener,
  input,
  output,
} from '@angular/core';

import { Window as WindowModel } from '../../core/models/window';

@Component({
  selector: 'app-window',
  imports: [],
  templateUrl: './window.html',
  styleUrl: './window.scss',
})
export class Window {

  public window = input.required<WindowModel>();
  public index = input.required<number>();

  public focused = output<number>();
  public draggedToTop = output<boolean>();

  private dragging = false;
  private startMouseX = 0;
  private startMouseY = 0;
  private startWindowX = 0;
  private startWindowY = 0;

  public startDrag(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    this.dragging = true;
    this.startMouseX = event.clientX;
    this.startMouseY = event.clientY;
    this.startWindowX = this.window().posX;
    this.startWindowY = this.window().posY;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.window().posX = this.startWindowX + event.clientX - this.startMouseX;
    const newPosY = this.startWindowY + event.clientY - this.startMouseY
    if(newPosY <= 0){
      this.draggedToTop.emit(true);
      this.window().posY = 0;
    }else{
      this.draggedToTop.emit(false);
      this.window().posY = newPosY;
    }
  }
  @HostListener('document:pointerup')
  stopDrag(): void {
    this.dragging = false;
  }
}