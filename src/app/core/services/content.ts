import { Injectable } from '@angular/core';
import { Language } from './language';
import { HomeContent } from '../models/home-content';
import { homeContent as enHomeContent } from '../../../content/en/home';
import { homeContent as plHomeContent } from '../../../content/pl/home';

@Injectable({
	providedIn: 'root'
})
export class Content {
	constructor(
		private language: Language
	) { }
	getHome(): HomeContent {
		switch (this.language.language()) {
			case 'pl': {
				return plHomeContent;
			}
			default: {
				return enHomeContent;
			}
		}
	}

}