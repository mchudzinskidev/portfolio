export interface HomeContent {
  generic: {
    fileExplorer: string;
    terminal: string;
    aboutMe: string;
    settings: string;
    browser: string;
  };
  desktop: {
    projects: string;
    reboot: string;
  };
  fileExplorer:{
    quickAccess: string;
    emptyFolderMsg: string;
    name: string;
    created: string;
    modified: string;
    starred: string;
  };
  rebootDialog:{
    line0: string;
    line1: string;
    line2: string;
    reload: string;
  };
  settings:{
    fullscreen: string;
  }
}