import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersProvider, IOrderData } from '../../providers/orders/orders';
import { GamesProvider, IGameData } from '../../providers/games/games';
import { NewOrderPage } from '../new-order/new-order';
import { NewGamePage } from '../new-game/new-game';
/**
 * Generated class for the FacturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-facture',
  templateUrl: 'facture.html',
})
export class FacturePage {

  id: Number;
  orders: IOrderData[];
  games: IGameData[];

  //TODO montant factures (tout récupérer et calcul en back ?)

  constructor(public navCtrl: NavController, public navParams: NavParams, public OrdersProvider: OrdersProvider, public GamesProvider: GamesProvider) {
    this.id = navParams.get('id_invoice');
  }

  public onReturnGame(index, game: IGameData){

    game.available = true;
    
    this.GamesProvider.returnGame(game)
    .then(response => {
      if(response)
        this.games[index].available = true;
    });
  }

  public onAddGame(){
    this.navCtrl.push(NewGamePage, {
      id_invoice: this.id
    });
  }

  public onAddOrder(){
    this.navCtrl.push(NewOrderPage, {
      id_invoice: this.id
    });
  }

  public onDeleteGame(game: IGameData){
    this.GamesProvider.deleteGame(game)
    .then(response => {
      if(response)
        this.games = this.games.filter(element => element != game);
    });
  }

  public onDeleteOrder(order: IOrderData){
    this.OrdersProvider.deleteOrder(order)
    .then(response => {
      if(response)
        this.orders = this.orders.filter(element => element != order);
    });
  }

  private getGamesHistory(){
    this.GamesProvider.getGamesHistory(this.id)
    .then(data => {
      this.games = data;
    });
  }

  private getOrders(){
    this.OrdersProvider.getOrders(this.id)
    .then(data => {
      this.orders = data;
    });
  }

  ionViewDidLoad() {
    this.getOrders();
    this.getGamesHistory();
  }

}