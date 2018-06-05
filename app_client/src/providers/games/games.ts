import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IGameData{
  id: number;
  name: string;
  type: number;
}

/*
  Generated class for the GamesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GamesProvider {

  constructor(public http: HttpClient) {
  }

  public getGames(id_invoice: Number): Promise<IGameData[]>{
    return this.http.get<IGameData[]>("../../assets/mocks/mock-games.json").toPromise();
  }

}
