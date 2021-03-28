import { Component, ViewChild } from '@angular/core';
import { Item, Contato, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList,} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: Item[] = [];
  newItem: Item = <Item>{};
  contatos: Contato[] = [];

  @ViewChild('mylist') mylist: IonList;
  @ViewChild('listaContatos') listaContatos: IonList;

  constructor(private strorageService: StorageService, private plt: Platform) {
    this.plt.ready().then(() => {
      this.loadItems;
      this.listarContatos;
    });
    this.loadItems();
    this.listarContatos();
  }

  loadItems(){
    this.strorageService.getItems().then(items => {
      this.items = items;
    });
  }

  listarContatos(){
    this.strorageService.getContatos().then(contatos => {
      this.contatos = contatos;
    });
  }

  addItem(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.strorageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.loadItems();
    });

  }

  updateItem(item: Item){
    
    item.title = 'UPDATE: ${item.title}';
    item.modified = Date.now();

    this.strorageService.updateItem(item).then(item => {
      this.mylist.closeSlidingItems();
      this.loadItems();
    });

  }

  deleteItem(item: Item){
    this.strorageService.delete(item.id).then(item => {
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }

  deletarContato(contato: Contato){
    this.strorageService.deleteContato(contato.id).then(contato => {
      this.mylist.closeSlidingItems();
      this.listarContatos();
    });
  }

  ionViewWillEnter(){
    this.loadItems();
  }

}
