import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IOrderData {
  id: number;
  name: string;
  price: number;
}

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdersProvider {

  constructor(public http: HttpClient) {
  }

  deleteOrder(order: IOrderData): Promise<boolean>{
    return this.http.delete<boolean>('' + order.id).toPromise();
  }

  getOrders(id_invoice: Number): Promise<IOrderData[]> {
    return this.http.get<IOrderData[]>("../../assets/mocks/mock-orders.json").toPromise();
  }

}