import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TablesProvider, ITableData} from '../../providers/tables-service/tables-service'


/**
 * Generated class for the NewTablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-table',
  templateUrl: 'new-table.html',
})
export class NewTablePage {

  selectedTable: ITableData;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedTable = navParams.get('table');
    console.log(this.selectedTable.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTablePage');
  }

}
