import { Component, inject, OnInit } from '@angular/core';
import { Node, FileSystem } from '../../core/services/file-system';

interface TerminalEvent {
  type: 'prompt' | 'output';
  text: string;
  path?: string;
}

@Component({
  selector: 'app-terminal',
  imports: [],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
})
export class Terminal implements OnInit{
  public fs = inject(FileSystem);
  public node: Node = this.fs.getFs();
  public username = 'marcin';
  public hostname = 'localhost';
  public terminalHistory: TerminalEvent[] = [];
  public inputHtmlElement: HTMLInputElement | null = null;
  ngOnInit(){
    this.inputHtmlElement = <HTMLInputElement>document.getElementById("prompt");
    this.focusInput();
    this.inputHtmlElement?.addEventListener("keyup", (event) => {
        if (event.key === 'Enter' && this.inputHtmlElement !== null && this.inputHtmlElement.value.length > 0 && (this.terminalHistory.length === 0 || this.terminalHistory[this.terminalHistory.length-1].type === 'output')) {
          this.terminalHistory.push({
            type: 'prompt',
            text: this.inputHtmlElement.value,
            path: this.fs.getPath(this.node),
          });
          this.terminalHistory.push({
            type: 'output',
            text: this.executeCmd(this.inputHtmlElement.value, this.node),
          });
          this.inputHtmlElement.value = '';
        }
    });
  }
  public focusInput(): void{
    this.inputHtmlElement?.focus();
  }
  private executeCmd(cmd: string, node: Node): string{
    switch(cmd){
      case 'whoami': {
        return this.username;
      }
      case 'pwd': {
        return this.fs.getPath(node);
      }
    }
    return 'Unknown command. Type "help" for list of available commands.'
  }
}
