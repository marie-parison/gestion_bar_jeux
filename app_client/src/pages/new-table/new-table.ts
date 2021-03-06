import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TablesProvider, ITableData } from '../../providers/tables-service/tables-service'
import { ClientsProvider, IClientData } from '../../providers/clients/clients'
import { InvoiceProvider } from '../../providers/invoice/invoice'
import { FacturePage } from '../facture/facture';
import { ClientFormPage } from '../client-form/client-form';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public clientsProvider: ClientsProvider,
    public invoiceProvider: InvoiceProvider,
  ) {
    this.selectedTable = navParams.get('table');
    this.clients = [];
    console.log('constructeur de table');
  }

  async getClientsByTable(id_table) {
    try {
      this.clients = [];
      this.clients.forEach((client, index) => {
        if (!client.lastname) {
          client.lastname = "Client " + (index + 1);
        }
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  
  async onKnownClient() {
    try {
      let clientEmail = prompt("Client's email :");
      if (clientEmail) {
        // let found = this.tryFindClient(clientEmail);
        // if (!found) {
          //   clientEmail = prompt("Aucun client enregistré ne correspond à ce mail");
          //   if (clientEmail) {
        //     this.tryFindClient(clientEmail);
        //   }
        // }
        let client = await this.clientsProvider.getClientByEmail(clientEmail);
        if (client.length > 0) {
          let newClients = [...this.clients, client[0]];
          this.clients = newClients;
        } else {
          clientEmail = prompt("Aucun client enregistré ne correspond à ce mail");
          if (clientEmail) {
            let client = await this.clientsProvider.getClientByEmail(clientEmail);
            if (client.length > 0) {
              let newClients = [...this.clients, client[0]];
              this.clients = newClients;
            }
          }
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  
  // async tryFindClient(clientEmail) {
    //   let client = await this.clientsProvider.getClientByEmail(clientEmail);
    //   if (client.length > 0) {
      //     let newClients = [...this.clients, client[0]];
      //     this.clients = newClients;
      //     return true;
      //   } else {
        //     return false;
        //   }
        // }
        
        async onNewClient() {
          this.navCtrl.push(ClientFormPage, {
            table: this.selectedTable,
      clients: this.clients,
    });
  }
  
  async createInvoice() {
    try {
      let clients_id = [];
      this.clients.forEach(client => {
        clients_id.push(client.id);
      });
      let { id } = await this.invoiceProvider.createInvoice(this.selectedTable.id, clients_id);
      this.navCtrl.push(FacturePage, {
        id_invoice: id
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTablePage');
  }
  
}
