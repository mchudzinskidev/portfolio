import { Component, input, OnInit } from '@angular/core';
import { Window as WindowModel } from '../../core/models/window';

@Component({
  selector: 'app-window',
  imports: [],
  templateUrl: './window.html',
  styleUrl: './window.scss',
})
export class Window {
  public window = input.required<WindowModel>();
}
