import { Injectable, Type } from '@angular/core';
import { Starling } from '../../components/files/starling/starling'

export interface Node {
    name: string;
    parent: DirectoryNode | null;
    favorite: boolean;
    created: string;
    modified: string;
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
    favorite: false,
    created: '2026',
    modified: '2026',
    children: [{
      name: 'about-this-app',
      parent: null,
      favorite: false,
      created: '2026',
      modified: '2026',
      children: [{
        name: 'about.txt',
        parent: null,
        favorite: false,
        created: '2026',
        modified: '2026',
      },{
        name: 'last-update.txt',
        parent: null,
        favorite: false,
        created: '2026',
        modified: '2026',
      },{
        name: 'version.txt',
        parent: null,
        favorite: false,
        created: '2026',
        modified: '2026',
      }]
    },{
      name: 'bin',
      parent: null,
      favorite: false,
      created: '2026',
      modified: '2026',
      children: [
        { name: 'cd', parent: null, favorite: false, created: '2026', modified: '2026' },
        { name: 'cls', parent: null, favorite: false, created: '2026', modified: '2026' },
        { name: 'ls', parent: null, favorite: false, created: '2026', modified: '2026' },
        { name: 'pwd', parent: null, favorite: false, created: '2026', modified: '2026' },
        { name: 'reboot', parent: null, favorite: false, created: '2026', modified: '2026' },
        { name: 'whoami', parent: null, favorite: false, created: '2026', modified: '2026' },
      ]
    },{
      name: 'desktop',
      parent: null,
      favorite: false,
      created: '2026',
      modified: '2026',
      children: [{
        name: 'projects',
        parent: null,
        favorite: true,
        created: '2019',
        modified: '2026',
        children: [{
          name: 'bluelotus.pl',
          parent: null,
          favorite: false,
          created: '2024',
          modified: '2026',
        },{
          name: 'starling - DIY star tracker',
          parent: null,
          favorite: true,
          created: '2023',
          modified: '2026',
        },{
          name: 'homelab',
          parent: null,
          favorite: true,
          created: '2020',
          modified: '2026',
        },{
          name: 'trading bot',
          parent: null,
          favorite: false,
          created: '2023',
          modified: '2025',
        },{
          name: 'bsodmaker.net',
          parent: null,
          favorite: false,
          created: '2024',
          modified: '2024',
        },{
          name: 'FDD keyboard',
          parent: null,
          favorite: false,
          created: '2020',
          modified: '2024',
        },{
          name: 'JourneyCraft',
          parent: null,
          favorite: true,
          created: '2020',
          modified: '2021',
        }],
      }]
    },{
      name: 'get-in-touch',
      parent: null,
      favorite: false,
      created: '2026',
      modified: '2026',
      children: [
        { name: 'mail.txt', parent: null, favorite: false, created: '2026', modified: '2026'  },
        { name: 'linkedin', parent: null, favorite: true, created: '2026', modified: '2026'  },
        { name: 'cv.pdf', parent: null, favorite: false, created: '2026', modified: '2026'  },
      ]
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
