import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTablePage } from './new-table';

@NgModule({
  declarations: [
    NewTablePage,
  ],
  imports: [
    IonicPageModule.forChild(NewTablePage),
  ],
})
export class NewTablePageModule {}
