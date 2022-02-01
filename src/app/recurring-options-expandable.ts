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
import { CustomerRecurringOptionsModel } from './models/customer-recurring-options.model';

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
  expandedElement: CustomerRecurringOptionsModel | null;
  customer: CustomerDataModel = new CustomerDataModel();

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.customer.firstName = 'Luka';
    this.customer.lastName = 'Čagalj';
    this.customer.oib = 123;
    this.customer.billingAccount = 456;
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

const ELEMENT_DATA: CustomerRecurringOptionsModel[] = [
  {
    status: 'COMPLETED',
    msisdn: '3859912345678',
    opcija: 'Opcija 1 GB + naplatni paket 16 kn',
    paket: 'PPR1',
    datum: '01.01.2022',
    error: '',
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345679',
    opcija: 'Opcija 10 GB + naplatni paket 45 kn',
    paket: 'PPR10',
    datum: '01.12.2021',
    error: '',
  },
  {
    status: 'FAILED',
    msisdn: '3859912345613',
    opcija: 'Opcija Unlimited + naplatni paket 99,36 kn',
    paket: 'UNLIMITED',
    datum: '01.11.2021',
    error: 'BA account nije aktivan!',
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345619',
    opcija: 'Opcija Surfam + naplatni paket 15,99 kn',
    paket: 'SURF',
    datum: '01.10.2021',
    error: '',
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345337',
    opcija: 'Opcija 100 GB + naplatni paket 9,99 kn',
    paket: 'PPR100',
    datum: '01.09.2021',
    error: '',
  },
  {
    status: 'FAILED',
    msisdn: '3859912347856',
    opcija: 'Opcija Vikend Surf + naplatni paket 100 kn',
    paket: 'VIKEND',
    datum: '01.08.2021',
    error: 'Ne postojeći MSISDN.',
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912343726',
    opcija: 'Opcija Stara + naplatni paket 1 kn',
    paket: 'STARA',
    datum: '01.07.2021',
    error: '',
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345638',
    opcija: 'Opcija Mala + naplatni paket 0 kn',
    paket: 'MALA',
    datum: '01.06.2021',
    error: '',
  },
  {
    status: 'COMPLETED',
    msisdn: '3859912345676',
    opcija: 'Opcija Oliver + naplatni paket 9,99 kn',
    paket: 'OLIVER',
    datum: '01.05.2021',
    error: '',
  },
  {
    status: 'FAILED',
    msisdn: '3859912345765',
    opcija: 'Opcija Silver + naplatni paket 195 kn',
    paket: 'SILVER',
    datum: '01.04.2021',
    error: 'Naplatni zahtjev u grešci!',
  },
];

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
