import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerDataModel } from './models/customer-data.model';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'recurring-options-expandable',
  styleUrls: ['recurring-options-expandable.css'],
  templateUrl: 'recurring-options-expandable.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class RecurringOptionsExpandable implements AfterViewInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  columnsToDisplay = ['msisdn', 'opcija', 'datum', 'status'];
  expandedElement: PeriodicElement | null;
  customer: CustomerDataModel;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.customer.firstName = 'Luka';
    this.customer.lastName = 'Čagalj';
    this.customer.oib = '123';
    this.customer.billingAccount = '456';
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  msisdn: string;
  oib: number;
  paket: string;
  status: string;
  customer: string;
  datum: string;
  error: string;
  opcija: string;
  billingAccount: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    status: 'COMPLETED',
    msisdn: '3859912345678',
    oib: 18487863527,
    opcija: 'Opcija 1 GB + naplatni paket 16 kn',
    paket: 'PPR1',
    customer: `Ante Nejasmic`,
    datum: '01.01.2022',
    error: '',
    billingAccount: 1238712378,
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345679',
    oib: 93937472664,
    opcija: 'Opcija 10 GB + naplatni paket 45 kn',
    paket: 'PPR10',
    customer: 'Marko Petrakovic',
    datum: '01.12.2021',
    error: '',
    billingAccount: 12983127983,
  },
  {
    status: 'FAILED',
    msisdn: '3859912345613',
    oib: 16652846009,
    opcija: 'Opcija Unlimited + naplatni paket 99,36 kn',
    paket: 'UNLIMITED',
    customer: `Petar Hektorović`,
    datum: '01.11.2021',
    error: 'BA account nije aktivan!',
    billingAccount: 8945387345,
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345619',
    oib: 84153801177,
    opcija: 'Opcija Surfam + naplatni paket 15,99 kn',
    paket: 'SURF',
    customer: `Juraj Dobrilo`,
    datum: '01.10.2021',
    error: '',
    billingAccount: 5765674334,
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345337',
    oib: 98510132352,
    opcija: 'Opcija 100 GB + naplatni paket 9,99 kn',
    paket: 'PPR100',
    customer: `Igor Vlahek`,
    datum: '01.09.2021',
    error: '',
    billingAccount: 436765445221,
  },
  {
    status: 'FAILED',
    msisdn: '3859912347856',
    oib: 29001321666,
    opcija: 'Opcija Vikend Surf + naplatni paket 100 kn',
    paket: 'VIKEND',
    customer: `Petar Preradović`,
    datum: '01.08.2021',
    error: 'Ne postojeći MSISDN.',
    billingAccount: 12377347433,
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912343726',
    oib: 62929386226,
    opcija: 'Opcija Stara + naplatni paket 1 kn',
    paket: 'STARA',
    customer: `Ivica Marica`,
    datum: '01.07.2021',
    error: '',
    billingAccount: 58454834538,
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345638',
    oib: 90646527917,
    opcija: 'Opcija Mala + naplatni paket 0 kn',
    paket: 'MALA',
    customer: `Ivana Mesar`,
    datum: '01.06.2021',
    error: '',
    billingAccount: 12378321678,
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345676',
    oib: 64211795970,
    opcija: 'Opcija Oliver + naplatni paket 9,99 kn',
    paket: 'OLIVER',
    customer: `Krešimir Kanibal`,
    datum: '01.05.2021',
    error: '',
    billingAccount: 8956875632,
  },
  {
    status: 'FAILED',
    msisdn: '3859912345765',
    oib: 64211795950,
    opcija: 'Opcija Silver + naplatni paket 195 kn',
    paket: 'SILVER',
    customer: `Marko Govance`,
    datum: '01.04.2021',
    error: 'Naplatni zahtjev u grešci!',
    billingAccount: 348577435832,
  },
];

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
