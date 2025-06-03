import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLocale = 'en';

  setLocale(locale: string) {
    this.currentLocale = locale;
  }

  getLocale(): string {
    return this.currentLocale;
  }
}