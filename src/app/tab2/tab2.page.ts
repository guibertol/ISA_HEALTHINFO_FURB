import { Component, ViewChild } from '@angular/core';
import { Item, Contato, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList,} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items: Item[] = [];
  contatos: Contato[] = [];
  newItem: Item = <Item>{};
  contato: Contato = <Contato>{};

  @ViewChild('mylist') mylist: IonList;

  constructor(private strorageService: StorageService, private plt: Platform, public toastController: ToastController) {
    /*this.plt.ready().then(() => {
      this.loadItems
    });*/
  }

  addItem(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.strorageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
    });

   this.exibir_mensagem('Doença salva com sucesso.');

  }

  cadastrarContato(){

    this.contato.id = Date.now();
    this.strorageService.cadastrarContato(this.contato).then(item => {
      this.contato = <Contato>{};
    });

    this.exibir_mensagem('Contato salvo com sucesso.');

  }

  async exibir_mensagem(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}
