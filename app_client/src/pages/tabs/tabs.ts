import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TablesPage } from '../tables/tables';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TablesPage;
  tab2Root = HomePage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;

  constructor() {

  }
}
