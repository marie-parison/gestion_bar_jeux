import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITableData } from '../../providers/tables-service/tables-service';
import { NewTablePage } from '../new-table/new-table';
import { ClientsProvider, IClientData } from '../../providers/clients/clients';

/**
 * Generated class for the ClientFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-form',
  templateUrl: 'client-form.html',
})
export class ClientFormPage {

  form: FormGroup;
  table: ITableData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clientsProvider: ClientsProvider
  ) {
    this.table = this.navParams.get('table');
    this.form = this.formBuilder.group({
      lastname: [''],
      firstname: [''],
      birthdate: [''],
      email: [''],
      gender: [''],
    });
  }
  
  returnToTable() {
    this.navCtrl.push(NewTablePage, {
      table: this.table
    });
  }
  
  async createClient() {
    let client = await this.clientsProvider.createClient(this.form.value);
    let tableClients = this.navParams.get('clients');
    tableClients.push(client);
    this.navCtrl.pop();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientFormPage');
  }

}
