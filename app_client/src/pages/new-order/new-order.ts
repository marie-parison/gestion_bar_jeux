import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FoodProvider, IFoodData } from '../../providers/food/food';

/**
 * Generated class for the NewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {

  food: IFoodData[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public FoodProvider: FoodProvider) {
  }

  public onAddFood(food: IFoodData){
    this.FoodProvider.addToInvoice(food).then( response => {
      if(response)
      this.navCtrl.pop();
    })
  }

  private getFood(){
    this.FoodProvider.getFood()
    .then(data => {
      this.food = data;
    })
  }

  ionViewDidLoad() {
    this.getFood();
  }

}