import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IInvoiceData {
  id: number;
  orders_bill: number;
  boards_bill: number;
  payed: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/*
  Generated class for the InvoiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InvoiceProvider {

  apiUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) {
    console.log('Hello InvoiceProvider Provider');
  }

  createInvoice(id_table, clients_id) {
    return this.http.post<IInvoiceData>(this.apiUrl + '/invoices', {id_table, clients_id}, httpOptions).toPromise();
  }

}
