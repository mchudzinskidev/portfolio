import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Node, FileSystem, DirectoryNode } from '../../core/services/file-system';

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
  @ViewChild('terminal') terminalElem!: ElementRef;
  public fs = inject(FileSystem);
  public node: DirectoryNode = this.fs.getFs();
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
          const wrapper = this.terminalElem.nativeElement;
          const scrollToBottom = wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight;
          if(scrollToBottom){
            setTimeout(() => {
              wrapper.scrollTo({
                top: wrapper.scrollHeight,
                behaviour: 'smooth',
              });
            });
          }
        }
    });
  }
  public focusInput(): void{
    this.inputHtmlElement?.focus();
  }
  private executeCmd(cmdString: string, node: DirectoryNode): string{
    const args = cmdString.split(' ');
    const cmd = args.shift();
    switch(cmd){
      case 'help': {
        return ['available commands:', 'whoami', 'pwd', 'cd', 'ls'].join('\n');
      }
      case 'whoami': {
        if(args.length === 0){
          return this.username;
        }
        return 'Bad usage';
      }
      case 'pwd': {
        if(args.length === 0){
          return this.fs.getPath(node);
        }
        return 'Bad usage';
      }
      case 'cd': {
        if(args.length === 0){
          return '';
        }else if(args.length === 1){
          const result = this.fs.resolvePath(args[0], node);
          if(result === null){
            return 'no such directory';
          }else if(!('children' in result)){
            return `${result.name} is not a directory`;
          }
          this.node = result;
          return '';
        }
        return 'Bad usage';
      }
      case 'ls': {
        if(args.length === 0){
          let result = '';
          for(let i = 0; i < node.children.length; i++){
            result += (i === 0 ? '' : '\n') + node.children[i].name;
          }
          return result;
        }else if(args.length === 1){
          let targetNode = this.fs.resolvePath(args[0], node);
          if(targetNode === null){
            return 'no such directory';
          }else if(!('children' in targetNode)){
            return `${targetNode.name} is not a directory`;
          }else{
            let result = '';
            for(let i = 0; i < targetNode.children.length; i++){
              result += (i === 0 ? '' : '\n') + targetNode.children[i].name;
            }
            return result;
          }
        }
        return 'Bad usage';
      }
    }
    return 'Unknown command. Type "help" for list of available commands.'
  }
}
