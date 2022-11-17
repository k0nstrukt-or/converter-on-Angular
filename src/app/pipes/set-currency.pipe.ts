import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../models/Currency';

@Pipe({
  name: 'setCurrency'
})
export class SetCurrencyPipe implements PipeTransform {

  transform(arr: Currency[], code: string): string {
    const currency = arr.find(currency => currency.cc === code)?.rate;

    return currency
      ? `1 ${code} = ${currency?.toFixed(2)} UAH` || ''
      : 'loading...';
  }

}
