import { HomeContent } from '../../app/core/models/home-content';

export const homeContent: HomeContent = {
  headerMenu: [
    {displayName: 'O mnie', link: '#'},
    {displayName: 'Projekty', subMenu: [
      {displayName: 'projekt starling', link: '#'},
      {displayName: 'JourneyCraft', link: '#'}
    ]},
    {displayName: 'Kontakt', link: '#'},
  ],
  header: {
    title: 'Goodbye world',
    subtitle: 'pl'
  }
};