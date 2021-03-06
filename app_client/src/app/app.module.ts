import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ClientFormPage } from '../pages/client-form/client-form';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TablesPage } from '../pages/tables/tables';
import { NewTablePage } from '../pages/new-table/new-table';
import { FacturePage } from '../pages/facture/facture';
import { NewOrderPage } from '../pages/new-order/new-order';
import { NewGamePage } from '../pages/new-game/new-game';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TablesProvider } from '../providers/tables-service/tables-service';
import { ClientsProvider } from '../providers/clients/clients';
import { InvoiceProvider } from '../providers/invoice/invoice';
import { OrdersProvider } from '../providers/orders/orders';
import { GamesProvider } from '../providers/games/games';
import { FoodProvider } from '../providers/food/food';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ClientFormPage,
    ContactPage,
    HomePage,
    TabsPage,
    TablesPage,
    NewTablePage,
    FacturePage,
    NewOrderPage,
    NewGamePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ClientFormPage,    
    ContactPage,
    HomePage,
    TabsPage,
    TablesPage,
    NewTablePage,
    FacturePage,
    NewOrderPage,
    NewGamePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TablesProvider,
    ClientsProvider,
    InvoiceProvider,
    OrdersProvider,
    GamesProvider,
    FoodProvider,
  ]
})
export class AppModule {}
