import { Component, inject, input } from '@angular/core';
import { FileSystem } from '../../core/services/file-system';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-browser',
  imports: [NgComponentOutlet],
  templateUrl: './browser.html',
  styleUrl: './browser.scss',
})
export class Browser {
  public fs = inject(FileSystem);
  public path = input<string>('');
}
