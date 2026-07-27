import { Injectable } from '@angular/core';

export interface Node {
    name: string;
    parent: DirectoryNode | null;
}
export interface DirectoryNode extends Node {
    children: (DirectoryNode | Node)[];
}

@Injectable({
  providedIn: 'root',
})
export class FileSystem {
  private rootFs: DirectoryNode = {
    name: 'root',
    parent: null,
    children: [{
      name: 'desktop',
      parent: null,
      children: [{
        name: 'cv.pdf',
        parent: null,
      },{
        name: 'get-in-touch',
        parent: null,
        children: [{ name: 'mail.txt', parent: null }, { name: 'linkedin.txt', parent: null }]
      },{
        name: 'projects',
        parent: null,
        children: [],
      }]
    }]
  };
  constructor(){
    this.linkParents(this.rootFs, null);
  }
  private linkParents(dir: DirectoryNode, parent: DirectoryNode | null): void {
    dir.parent = parent;
    for (const child of dir.children) {
      child.parent = dir;
      if ('children' in child) {
        this.linkParents(child, dir);
      }
    }
  }
  public getFs(): Node{
    return this.rootFs;
  }
  public resolvePath(path: string): DirectoryNode | Node | null {
    const parts = path.split('/');
    let nodes: (DirectoryNode | Node)[] = [this.rootFs];
    for(let i = 0; i < parts.length; i++){
      let part = parts[i];
      let node = nodes.find(node => node.name === part);
      if(node){
        if(i === parts.length - 1){
          return node;
        }else{
          if('children' in node){
            nodes = node.children;
          }else{
            return null;
          }
        }
      }else{
        return null;
      }
    }
    return null;
  }
  public getPath(node: DirectoryNode | Node): string {
    const result: string[] = [];
    for(;;){
      result.push(node.name);
      if(node.parent){
        node = node.parent;
      }else{
        return result.reverse().join('/');
      }
    }
  }
}
