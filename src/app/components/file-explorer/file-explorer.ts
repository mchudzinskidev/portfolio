import { Component, inject, input, OnInit } from '@angular/core';
import { DirectoryNode, FileSystem, Node } from '../../core/services/file-system';

@Component({
  selector: 'app-file-explorer',
  imports: [],
  templateUrl: './file-explorer.html',
  styleUrl: './file-explorer.scss',
})
export class FileExplorer implements OnInit{
  public fs = inject(FileSystem);
  public currentNode = input<(Node | DirectoryNode)>(this.fs.getFs());
  public openBrowserClicked = input<(path: string) => void>(() => {});
  public node: (Node | DirectoryNode) = this.fs.getFs();
  public quickAccessItems: (Node | null)[] = [
    this.fs.resolvePath('home'),
    this.fs.resolvePath('home/desktop/projects')
  ];
  ngOnInit(){
    this.node = this.currentNode();
  }
  public goToUpperDir(): void{
    this.node = this.node.parent ?? this.node;
  }
  public goToHome(): void{
    this.node = this.fs.getFs();
  }
  public openNode(node: Node): void{
    if('children' in node){
      this.node = node;
    }else{
      this.openBrowserClicked()(this.fs.getPath(node));
    }
  }
  public getPathComponents(): Node[]{
    const result: Node[] = [];
    let node: Node | null = this.node;
    do {
      result.push(node);
      node = node.parent;
    } while (node !== null);
    return result.reverse();
  }
}
