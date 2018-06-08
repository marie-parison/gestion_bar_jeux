import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IClientData {
  id?: number;
  lastname: string;
  firstname: string;
  birthdate: Date;
  email: string;
  gender: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/*
  Generated class for the ClientsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ClientsProvider {

  apiUrl = 'http://localhost:3000';
  
  constructor(public http: HttpClient) {
    console.log('Hello ClientsProvider Provider');
  }

  // getClientsByTable(table): Promise<IClientData[]> {
    // TODO requête au back pour récupérer tous les clients qui sont à cette table ?
  //   return this.http.get<IClientData[]>('../../assets/mocks/mock-clients.json').toPromise();
  // }

  getClientByEmail(email): Promise<IClientData[]> {
    return this.http.get<IClientData[]>(this.apiUrl + '/clients?email=' + email).toPromise();
  }

  createClient(client): Promise<any> {
    return this.http.post<any>(this.apiUrl + '/clients', client, httpOptions).toPromise();
  }

  // assignClientToTable(client, table): Promise<any> {
    // TODO demander au back d'assigner le client à la table
    // return this.http.get<IClientData>('../../assets/mocks/mock-client.json').toPromise();
  // }

}
