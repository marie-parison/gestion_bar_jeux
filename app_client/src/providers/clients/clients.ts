import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IClientData {
  id?: number;
  lastname: string;
  firstname: string;
  birthdate: Date;
  email: string;
  gender: string;
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

  createClient(client): Promise<IClientData> {
    // TODO envoyer au back le contenu du formulaire pour créer le client dans la base    
    return this.http.get<IClientData>('../../assets/mocks/mock-client.json').toPromise();
  }

  assignClientToTable(client, table): Promise<any> {
    // TODO demander au back d'assigner le client à la table
    return this.http.get<IClientData>('../../assets/mocks/mock-client.json').toPromise();
  }

}
