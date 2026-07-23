import { Component, input } from '@angular/core';
import { HomeContent } from '../../core/models/home-content';

@Component({
  selector: 'app-header-menu',
  imports: [],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.scss',
})
export class HeaderMenu {
  public headerMenu = input.required<HomeContent['headerMenu']>();
}
