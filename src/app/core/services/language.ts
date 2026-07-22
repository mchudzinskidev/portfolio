import { Injectable, signal } from '@angular/core';
import { Language as Lang} from '../types/language'

@Injectable({
  providedIn: 'root',
})
export class Language {
  public readonly language = signal<Lang>('en');
}
