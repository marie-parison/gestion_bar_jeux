import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacturePage } from './facture';

@NgModule({
  declarations: [
    FacturePage,
  ],
  imports: [
    IonicPageModule.forChild(FacturePage),
  ],
})
export class FacturePageModule {}
