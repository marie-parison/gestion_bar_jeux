import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TablesProvider, ITableData} from '../../providers/tables-service/tables-service'
import { NewTablePage } from '../new-table/new-table';
import { FacturePage } from '../facture/facture';

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

  onTable(event, table) {
    if(table.available) {
      this.navCtrl.push(NewTablePage, {
        table: table
      });
    } else {
      this.navCtrl.push(FacturePage, {
        id_invoice: table.id_invoice
      });
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TablesPage');
    this.getTables();
  } 

}