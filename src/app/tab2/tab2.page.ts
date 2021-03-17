import { Component, ViewChild } from '@angular/core';
import { Item, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList,} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items: Item[] = [];
  newItem: Item = <Item>{};

  @ViewChild('mylist') mylist: IonList;

  constructor(private strorageService: StorageService, private plt: Platform) {
    /*this.plt.ready().then(() => {
      this.loadItems
    });*/
    this.loadItems();
  }

  addItem(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.strorageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.loadItems();
    });

  }

  loadItems(){
    this.strorageService.getItems().then(items => {
      this.items = items;
    });
  }

}
