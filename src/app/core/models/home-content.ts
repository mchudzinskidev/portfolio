interface MenuItem {
  displayName: string;
  link?: string;
  subMenu?: {
    displayName: string;
    link: string;
  }[];
}

export interface HomeContent {
  headerMenu: MenuItem[],
  header: {
    title: string;
    subtitle: string;
  };
}