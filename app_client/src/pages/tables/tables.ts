import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TablesProvider, ITableData} from '../../providers/tables-service/tables-service'

/**
 * Generated class for the TablesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tables',
  templateUrl: 'tables.html',
})
export class TablesPage {

  tables: ITableData[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public tablesProvider: TablesProvider) {
  }

  getTables() {
    this.tablesProvider.getTables()
    .then(data => {
      this.tables = data;
      console.log(this.tables);
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TablesPage');
    this.getTables();
  } 

}