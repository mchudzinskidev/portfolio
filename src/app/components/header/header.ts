import { Component, input } from '@angular/core';
import { HomeContent } from '../../core/models/home-content';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public header = input.required<HomeContent['header']>();
}
