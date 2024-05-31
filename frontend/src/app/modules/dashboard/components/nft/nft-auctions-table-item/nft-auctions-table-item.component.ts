import { Component, Input, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DataService } from 'src/app/data.service';

@Component({
  selector: '[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, CurrencyPipe],
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() auction = <any>{};

  constructor() {}

  ngOnInit(): void {}
}
