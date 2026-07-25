import { Component, output } from '@angular/core';

@Component({
  selector: 'app-start-menu',
  imports: [],
  templateUrl: './start-menu.html',
  styleUrl: './start-menu.scss',
})
export class StartMenu {
  public openFileExplorerWindowClicked = output<void>();
  public openAboutWindowClicked = output<void>();
  public openTerminalWindowClicked = output<void>();
  public openSettingsWindowClicked = output<void>();
}
