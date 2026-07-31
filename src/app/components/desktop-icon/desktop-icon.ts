import { Component, input, output } from '@angular/core';
import { DesktopIcon as DesktopIconModel } from '../../core/models/desktop-icon';

@Component({
  selector: 'app-desktop-icon',
  imports: [],
  templateUrl: './desktop-icon.html',
  styleUrl: './desktop-icon.scss',
})
export class DesktopIcon {
  public iconDetails = input.required<DesktopIconModel>();

  public clicked = output<void>();
  public selected = output<void>();
}
