import { Component } from '@angular/core';

@Component({
  selector: 'app-reboot-dialog',
  imports: [],
  templateUrl: './reboot-dialog.html',
  styleUrl: './reboot-dialog.scss',
})
export class RebootDialog {
  public reloadPage(): void{
    window.location.reload();
  }
}
