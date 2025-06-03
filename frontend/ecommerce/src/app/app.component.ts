import { Component } from '@angular/core';
import { LocaleService } from './services/locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isOpen: boolean = false;

  // sets the locale based on the browser's locale
  constructor(private localeService: LocaleService) {
    const browserLocale = navigator.language || 'es';
    console.log('Browser Locale:', browserLocale);
    const supportedLocales = ['en', 'es', 'de'];
    const locale = supportedLocales.includes(browserLocale.slice(0, 2)) ? browserLocale.slice(0, 2) : 'es';
    console.log('Selected Locale:', locale);
    this.localeService.setLocale(locale);
  }
}
