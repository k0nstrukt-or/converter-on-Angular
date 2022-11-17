import { Component, OnInit } from '@angular/core';
import { Currency } from '../models/Currency';
import { CurrencyRateApiService } from '../services/currency-rate.api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rates: Currency[] = [];
  date: Date | undefined;

  constructor(private currencyService: CurrencyRateApiService) { }

  ngOnInit(): void {
    this.currencyService.getBasicCurrency().subscribe(rates => {
      this.rates = rates

      this.date = new Date();
      this.date.setDate(this.date.getDate())
    })
  }
}
