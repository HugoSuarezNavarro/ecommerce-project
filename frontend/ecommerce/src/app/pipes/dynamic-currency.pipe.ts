import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '../services/locale.service';

@Pipe({
  name: 'dynamicCurrency',
  standalone: false
})
export class DynamicCurrencyPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe, private localeService: LocaleService) {}

  transform(value: number, currencyCode: string = 'EUR', digits?: string): string | null {
    const locale = this.localeService.getLocale();
    return this.currencyPipe.transform(value, currencyCode, 'symbol', digits, locale);
  }
}
