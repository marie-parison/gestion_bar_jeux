import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ITableData {
  id: number;
  number: number;
  available: boolean;
  iscaca?: boolean;
}
/*
  Generated class for the TablesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TablesProvider {

  apiUrl = '';

  constructor(public http: HttpClient) {
    console.log('Hello TablesServiceProvider Provider');
  }

  getTables(): Promise<ITableData[]> {
    return this.http.get<ITableData[]>('../../assets/mocks/mock-tables.json').toPromise();
  }

}
