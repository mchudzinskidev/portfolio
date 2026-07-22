import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { languageGuard } from './core/guards/language-guard';
import { validLanguageGuard } from './core/guards/valid-language-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [languageGuard],
    children: []
  }, {
    path: ':lang',
    children: [
      {
        path: '',
        canActivate: [validLanguageGuard],
        component: HomePage
      }
    ]
  }, {
    path: '**',
    redirectTo: ''
  }
];
