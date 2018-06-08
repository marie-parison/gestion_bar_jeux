import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IFoodData  {
  id: number;
  name: string;
  price: number;
  picture: string;
}

/*
  Generated class for the FoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FoodProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FoodProvider Provider');
  }

  public addToInvoice(food:IFoodData): Promise<boolean>{
    return this.http.post<boolean>('', food).toPromise();
  }

  public getFood(id_invoice: Number): Promise<IFoodData[]>{
    return this.http.get<IFoodData[]>('').toPromise();
  }

}