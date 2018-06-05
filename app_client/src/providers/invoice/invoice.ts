import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IInvoiceData {
  id: number;
  orders_bill: number;
  boards_bill: number;
  payed: boolean;
}

/*
  Generated class for the InvoiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InvoiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello InvoiceProvider Provider');
  }

  createInvoice(id_table) {
    // TODO envoyer la requête de création de facture au back, récupérer du back les données de la facture créée
    return this.http.get<IInvoiceData[]>('../../assets/mocks/mock-invoice.json').toPromise();
  }

}
