import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const languageGuard: CanActivateFn = () => {
  return inject(Router).createUrlTree([navigator.language.startsWith('pl') ? 'pl' : 'en']);
};