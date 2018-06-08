import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IBoardData} from "../_interfaces/data";
import {IQueries} from "../_interfaces/queries";

import {prepareQueries} from '../../helpers/queries';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const URL = "http://localhost:3000/";

/*
  Generated class for the BoardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BoardsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BoardsProvider Provider');
  }

  public getBoards(queries: IQueries = {limit:30}): Promise<IBoardData[]> {
    let uri = URL + "boards" + prepareQueries(queries);
    return this.http.get<IBoardData[]>(uri, httpOptions).toPromise();
  }

  public renderAvailableBoard(id: number) {
    let uri = URL + "boards/" +id+ "/free";
    return this.http.post<IBoardData[]>(uri, {},  httpOptions).toPromise();

  }
  public renderNotAvailableBoard(id: number) {
    let uri = URL + "boards/" +id+ "/remove";
    return this.http.post<IBoardData[]>(uri, {},  httpOptions).toPromise();

  }

}
