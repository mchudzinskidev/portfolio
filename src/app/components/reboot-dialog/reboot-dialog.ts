import { Component, inject, input } from '@angular/core';
import { Language } from '../../core/services/language';
import { Content } from '../../core/services/content';

@Component({
  selector: 'app-reboot-dialog',
  imports: [],
  templateUrl: './reboot-dialog.html',
  styleUrl: './reboot-dialog.scss',
})
export class RebootDialog {
  public ls = inject(Language);
  public content = inject(Content).getHome().rebootDialog;
  public showRestartRequiredMsg = input<boolean>(false);
  public reloadPage(): void {
    console.log(this.showRestartRequiredMsg());
    const newPath = window.location.pathname.replace(/^\/(en|pl)(?=\/|$)/,`/${this.ls.newLangAfterReload}`);
    window.location.href = newPath + window.location.search + window.location.hash;
  }
}