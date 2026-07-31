import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bios as BiosService } from './core/services/bios';
import { Bios } from './components/bios/bios';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Bios],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public biosService = inject(BiosService);
}
