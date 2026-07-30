import { Component, inject } from '@angular/core';
import { Bios as BiosService } from '../../core/services/bios';

@Component({
  selector: 'app-bios',
  imports: [],
  templateUrl: './bios.html',
  styleUrl: './bios.scss',
})
export class Bios {
  private biosService = inject(BiosService);
  public readonly displayedMessages: string[] = [];
  public readonly messages = [
    { text: `Resolution........ ${screen.width} x ${screen.height}`, delay: 100 },
    { text: `Date.............. ${new Date().toString()}`, delay: 250 },
    { text: `CPU............... ${navigator.hardwareConcurrency} Core${navigator.hardwareConcurrency > 1 ? 's' : ''}`, delay: 120 },
    { text: `Browser........... ${navigator.userAgent}`, delay: 100 },
    { text: `App Version....... ${navigator.appVersion}`, delay: 120 },
    { text: `Platform.......... ${navigator.platform}`, delay: 500 },
    { text: 'Starting OS...', delay: 300 },
  ];
  constructor() {
    this.boot();
  }
  private async boot(): Promise<void> {
    for (const message of this.messages) {
      this.displayedMessages.push(message.text);
      await this.delay(message.delay);
      if(this.messages.length === this.displayedMessages.length){
        this.displayedMessages.fill('');
        await this.delay(1000);
      }
    }
    await this.delay(300);
    this.biosService.isBooting = false;
  }
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}