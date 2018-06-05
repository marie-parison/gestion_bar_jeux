import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TablesProvider, ITableData } from '../../providers/tables-service/tables-service'
import { ClientsProvider, IClientData } from '../../providers/clients/clients'
import { InvoiceProvider } from '../../providers/invoice/invoice'


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
  clients: IClientData[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public clientsProvider: ClientsProvider, public invoiceProvider: InvoiceProvider) {
    this.selectedTable = navParams.get('table');
  }

  getClientsByTable(id_table) {
    this.clientsProvider.getClientsByTable(id_table)
      .then(data => {
        this.clients = data;
        let count = 1;
        this.clients.forEach(client => {
          if (!client.name) {
            client.number = count;
          }
          count++;
        });
      });
  }

  createInvoice() {
    this.invoiceProvider.createInvoice(this.selectedTable.id)
    //   .then(invoice => {
    //     this.navCtrl.push(FacturePage, {
    //       id_invoice: invoice.id
    //     });
    //   }
    // );
  }
  
  onKnownClient(client) {
    let clientEmail = prompt("Client's email :");
    if(clientEmail) {
      this.clientsProvider.getClientByEmail({"email": clientEmail}).then(client => {
        this.clients.push(client)
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTablePage');
    this.getClientsByTable(this.selectedTable.id);
  }

}
