import { Component, ViewChild } from '@angular/core';
import { Doenca, Contato, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList,} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items: Doenca[] = [];
  contatos: Contato[] = [];
  newDoenca: Doenca = <Doenca>{};
  contato: Contato = <Contato>{};

  @ViewChild('mylist') mylist: IonList;

  constructor(private strorageService: StorageService, private plt: Platform, public toastController: ToastController) {
    /*this.plt.ready().then(() => {
      this.loadItems
    });*/
  }

    cadatrarDoenca(){
    this.newDoenca.modified = Date.now();
    this.newDoenca.id = Date.now();

    this.strorageService.cadatrarDoenca(this.newDoenca).then(item => {
      this.newDoenca = <Doenca>{};
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
