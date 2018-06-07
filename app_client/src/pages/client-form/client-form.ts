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
  error: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clientsProvider: ClientsProvider
  ) {
    this.table = this.navParams.get('table');
    this.form = this.formBuilder.group({
      lastname: [''],
      fistname: [''],
      birthdate: [''],
      email: [''],
      gender: [''],
    });
  }
  
  // returnToTable() {
  //   this.navCtrl.push(NewTablePage, {
  //     table: this.table
  //   });
  // }
  
  async createClient() {
    // remplace les valeurs "" par des null pour préparer la requête au back
    for (let property in this.form.value) {
      if(this.form.value.hasOwnProperty(property)) {
        if(this.form.value[property] == "") {
          this.form.value[property] = null;
        }
      }
    }
    // création du client dans la base
    try {
      let client = await this.clientsProvider.createClient(this.form.value);
      let tableClients = this.navParams.get('clients');
      tableClients.push(client);
      this.navCtrl.pop();    
    } catch {
      this.error = "Cet email apparaît déjà dans la base de données";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientFormPage');
  }

}
