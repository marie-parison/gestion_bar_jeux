import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ITableData {
  id: number;
  number: number;
  available: boolean;
  iscaca?: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/*
Generated class for the TablesServiceProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class TablesProvider {
  
  apiUrl = 'http://localhost:3000';
  
  constructor(public http: HttpClient) {
    console.log('Hello TablesServiceProvider Provider');
  }

  getTables(): Promise<ITableData[]> {
    return this.http.get<ITableData[]>(this.apiUrl + '/tables', httpOptions).toPromise();
  }

}
