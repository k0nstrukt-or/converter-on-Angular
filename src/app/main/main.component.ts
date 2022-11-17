import { Component, OnInit } from '@angular/core';
import { Currency } from '../models/Currency';
import { CurrencyRateApiService } from '../services/currency-rate.api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  rates: Currency[] = [];

  firstValue = 1;
  firstRate = 1;

  secondValue = 1;
  secondRate = 1;

  onFirstSelect(event: Event) {
    const selectorValue = (event.target as HTMLSelectElement).value;

    this.firstRate = this.rates
      .find(currency => currency.cc === selectorValue)?.rate || 1;
    this.secondValue = +(this.firstValue * this.firstRate / this.secondRate).toFixed(2);
  }

  onSecondSelect(event: Event) {
    const selectorValue = (event.target as HTMLSelectElement).value;

    this.secondRate = this.rates
      .find(currency => currency.cc === selectorValue)?.rate || 1;
    this.firstValue = +(this.secondValue * this.secondRate / this.firstRate).toFixed(2);
  }

  onFirstInputChange(event: Event) {
    this.firstValue = +(event.target as HTMLInputElement).value;
    this.secondValue = +(this.firstValue * this.firstRate / this.secondRate).toFixed(2);
  }

  onSecondInputChange(event: Event) {
    this.secondValue = +(event.target as HTMLInputElement).value;
    this.firstValue = +(this.secondValue * this.secondRate / this.firstRate).toFixed(2);
  }

  constructor(private currencyService: CurrencyRateApiService) { }

  ngOnInit(): void {
    this.currencyService.getBasicCurrency().subscribe(allRates => {
      this.rates = allRates.sort((a, b) => a.txt.localeCompare(b.txt));
    })
  }

}
