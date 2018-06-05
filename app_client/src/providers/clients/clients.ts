import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IClientData {
  id: number;
  name: string;
  surname: string;
  birthdate: Date;
  email: string;
  genre: string;
  number?: number;
}

/*
  Generated class for the ClientsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ClientsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ClientsProvider Provider');
  }

  getClientsByTable(table): Promise<IClientData[]> {
    // TODO requête au back pour récupérer tous les clients qui sont à cette table
    return this.http.get<IClientData[]>('../../assets/mocks/mock-clients.json').toPromise();
  }

  getClientByEmail(email): Promise<IClientData> {
    // TODO requête au back pour récupérer les données du client qui a cet email
    return this.http.get<IClientData>('../../assets/mocks/mock-client.json').toPromise();
  }


}
