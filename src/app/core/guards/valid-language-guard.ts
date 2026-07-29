import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Language } from '../services/language';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

export const validLanguageGuard: CanActivateFn = (route) => {
  const lang = route.paramMap.get('lang');
  if (lang === 'en' || lang === 'pl'){
    const ls = inject(Language);
    const document = inject(DOCUMENT);
    const title = inject(Title);
    ls.language.set(lang);
    ls.newLangAfterReload = lang;
    document.documentElement.lang = lang;
    title.setTitle(lang === 'pl' ? 'Portfolio | Marcin Chudziński' : 'Portfolio | Marcin Chudziński');
    return true;
  }
  return inject(Router).createUrlTree(['/']);
};
