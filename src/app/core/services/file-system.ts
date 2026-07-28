import { Injectable, Type } from '@angular/core';
import { Starling } from '../../components/files/starling/starling'

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
    name: 'home',
    parent: null,
    children: [{
      name: 'about-this-app',
      parent: null,
      children: [{
        name: 'about.txt',
        parent: null,
      },{
        name: 'last-update.txt',
        parent: null,
      },{
        name: 'version.txt',
        parent: null,
      }]
    },{
      name: 'bin',
      parent: null,
      children: [
        { name: 'cd', parent: null },
        { name: 'cls', parent: null },
        { name: 'ls', parent: null },
        { name: 'pwd', parent: null },
        { name: 'reboot', parent: null },
        { name: 'whoami', parent: null },
      ]
    },{
      name: 'desktop',
      parent: null,
      children: [{
        name: 'get-in-touch',
        parent: null,
        children: [{ name: 'mail.txt', parent: null }, { name: 'linkedin', parent: null }, { name: 'cv.pdf', parent: null }]
      },{
        name: 'projects',
        parent: null,
        children: [{
          name: 'starling',
          parent: null,
        },{
          name: 'bluelotus',
          parent: null,
        }, {
          name: 'JourneyCraft',
          parent: null,
        }],
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
  public getFs(): DirectoryNode{
    return this.rootFs;
  }
  public resolvePath(path: string, base: DirectoryNode): DirectoryNode | Node | null {
    const parts = path.split('/');
    let current: DirectoryNode | Node;
    if (parts[0] === this.rootFs.name) {
      parts.shift();
      current = this.rootFs;
    } else {
      current = base;
    }
    for (const part of parts) {
      if (part === '' || part === '.') {
        continue;
      }
      if (part === '..') {
        if (current.parent) {
          current = current.parent;
        }
        continue;
      }
      if (!('children' in current)) {
        return null;
      }
      const next = current.children.find(child => child.name === part);
      if (!next) {
        return null;
      }
      current = next;
    }
    return current;
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
  public getFileContent(path: string): Type<any> | null{
    switch(path){
      case 'home/desktop/projects/starling':
        return Starling;
    }
    return null;
  }
}
