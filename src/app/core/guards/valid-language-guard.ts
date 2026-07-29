import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Language } from '../services/language';

export const validLanguageGuard: CanActivateFn = (route) => {
  const lang = route.paramMap.get('lang');
  if (lang === 'en' || lang === 'pl'){
    const ls = inject(Language);
    ls.language.set(lang);
    ls.newLangAfterReload = lang;
    return true;
  }
  return inject(Router).createUrlTree(['/']);
};
