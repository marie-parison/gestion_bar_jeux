import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamesProvider, IGameData } from '../../providers/games/games';
import { NewOrderPage } from '../new-order/new-order';
import { NewGamePage } from '../new-game/new-game';
import { InvoiceProvider  } from '../../providers/invoice/invoice';
import { IInvoiceData } from '../../providers/_interfaces/data';
import { FoodProvider  } from '../../providers/food/food';
import { IFoodData } from '../../providers/_interfaces/data';
import { IBoardData } from '../../providers/_interfaces/data';

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

  invoice: IInvoiceData;

  //TODO montant factures (tout récupérer et calcul en back ?)

  constructor(public navCtrl: NavController, public navParams: NavParams, public FoodProvider: FoodProvider, public GamesProvider: GamesProvider, public InvoiceProvider: InvoiceProvider) {
  }

  public onReturnGame(index, game: IBoardData) {

    game.available = true;

    this.GamesProvider.returnGame(game)
      .then(response => {
        if (response)
          this.invoice.boards[index].available = true;
      });
  }

  public onAddGame() {
    this.navCtrl.push(NewGamePage, {
      id_invoice: this.invoice.id
    });
  }

  public onAddFood() {
    this.navCtrl.push(NewOrderPage, {
      id_invoice: this.invoice.id
    });
  }

  public onDeleteGame(game: IBoardData) {
    this.GamesProvider.deleteGame(game)
      .then(response => {
        if (response)
        this.invoice.boards = this.invoice.boards.filter(element => element != game);
      });
  }

  public onDeleteFood(food: IFoodData) {
    this.FoodProvider.deleteFood(food)
      .then(response => {
        if (response)
          this.invoice.foods = this.invoice.foods.filter(element => element != food);
      });
  }

  ionViewDidLoad() {
    this.InvoiceProvider.getInvoice(this.navParams.get('id_invoice')).then(data => {
      this.invoice = data;
      console.log(this.invoice)
    })
  }

}