import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BoardsProvider} from "../../providers/boards/boards";
import {IBoardData} from "../../providers/_interfaces/data";

/**
 * Generated class for the BoardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boards',
  templateUrl: 'boards.html',
})
export class BoardsPage {

  public boards = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public boardsProviders: BoardsProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoardsPage');
    this.loadBoards();
  }

  public async loadBoards() {
    let boards = await this.boardsProviders.getBoards({limit:30});
    this.boards = boards;
    console.log(boards);
  }

  public async toggleAvailable(board: IBoardData) {
    console.log("AVANT", board.available);

    board.available = !board.available;
    console.log("APRES", board.available);
    if(board.available) {
        console.log("FREE");
      await this.boardsProviders.renderAvailableBoard(board.id);
    } else {
      console.log("REMOVE");
      await this.boardsProviders.renderNotAvailableBoard(board.id);
    }
    this.loadBoards();
  }
}
