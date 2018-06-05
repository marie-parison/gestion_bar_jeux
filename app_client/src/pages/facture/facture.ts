import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersProvider, IOrderData } from '../../providers/orders/orders';
import { GamesProvider, IGameData } from '../../providers/games/games';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public OrdersProvider: OrdersProvider, public GamesProvider: GamesProvider) {
    this.id = navParams.get('id_invoice');
  }

  public onDeleteOrder(order: IOrderData){
    this.OrdersProvider.deleteOrder(order)
    .then(response => {
      if(response)
        this.orders = this.orders.filter(element => element != order);
    });
  }

  private getBoards(){
    this.GamesProvider.getGames(this.id)
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
    this.getBoards();
  }

}