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
  }

  async getClientsByTable(id_table) {
    try {
      this.clients = await this.clientsProvider.getClientsByTable(id_table);
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

  async createInvoice() {
    try {
      let { id } = await this.invoiceProvider.createInvoice(this.selectedTable.id, this.clients);
      this.navCtrl.push(FacturePage, {
        id_invoice: id
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
        let client = await this.clientsProvider.getClientByEmail({ email: clientEmail });
        // this.clients.push(client);
        await this.clientsProvider.assignClientToTable(client, this.selectedTable);
        let newClients = [...this.clients, client];
        this.clients = newClients;
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  async onNewClient() {
    this.navCtrl.push(ClientFormPage, {
      table: this.selectedTable
    });
  }

  openClientForm() {
    // TODO afficher le formulaire de création de client quand on clique sur "nouveau client"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTablePage');
    this.getClientsByTable(this.selectedTable.id);
  }

}
