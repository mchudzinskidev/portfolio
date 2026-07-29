import { HomeContent } from '../../app/core/models/home-content';

export const homeContent: HomeContent = {
  generic: {
    fileExplorer: 'File Explorer',
    terminal: 'Terminal',
    aboutMe: 'About Me',
    settings: 'Settings',
    browser: 'File Browser'
  },
  desktop: {
    projects: "Projects",
    reboot: "Reboot"
  },
  fileExplorer:{
    quickAccess: 'Quick Access',
    emptyFolderMsg: 'This folder is empty',
    name: 'Name',
    created: 'Created',
    modified: 'Modified',
    starred: 'Starred',
  },
  rebootDialog:{
    line0: 'System restart required',
    line1: 'Are you sure you want to reload your system?',
    line2: 'All changes will be lost',
    reload: 'Reload',
  },
  settings:{
    fullscreen: 'Fullscreen',
  },
};