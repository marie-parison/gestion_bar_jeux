import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';

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

  drinks;
  menus;


  constructor(public navCtrl: NavController, public navParams: NavParams, public FoodProvider: FoodProvider) {
  }

  public display(element){
    // switch(1){
    //   case (element == this.drinks)
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewOrderPage');
  }

}