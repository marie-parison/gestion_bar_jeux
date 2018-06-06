import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IGameData{
  id: number;
  name: string;
  type: number;
  available: boolean;
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

  public returnGame(game: IGameData){
    return this.http.put<boolean>('' + game.id, game).toPromise();
  }

  public deleteGame(game: IGameData): Promise<boolean>{
    return this.http.delete<boolean>('' + game.id).toPromise();
  }

  public getGamesHistory(id_invoice: Number): Promise<IGameData[]>{
    return this.http.get<IGameData[]>("../../assets/mocks/mock-games.json").toPromise();
  }

}
