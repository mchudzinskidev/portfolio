import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Language } from '../services/language';

export const validLanguageGuard: CanActivateFn = (route) => {
  const lang = route.paramMap.get('lang');
  if (lang === 'en' || lang === 'pl'){
    inject(Language).language.set(lang);
    return true;
  }
  return inject(Router).createUrlTree(['/']);
};
