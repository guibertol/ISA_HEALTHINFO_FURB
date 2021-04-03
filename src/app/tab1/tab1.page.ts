import { Component, ViewChild } from '@angular/core';
import { Doenca, Contato, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList,} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  doencas: Doenca[] = [];
  newDoenca: Doenca = <Doenca>{};
  contatos: Contato[] = [];

  @ViewChild('mylist') mylist: IonList;
  @ViewChild('listaContatos') listaContatos: IonList;

  constructor(private strorageService: StorageService, private plt: Platform) {
    this.loadDoencas();
    this.loadContatos();
  }

  loadDoencas(){
    this.strorageService.getDoencas().then(doencas => {
      this.doencas = doencas;
    });
  }

  loadContatos(){
    this.strorageService.getContatos().then(contatos => {
      console.log(contatos)
      this.contatos = contatos;
    });
  }

  cadatrarDoenca(){
    this.newDoenca.modified = Date.now();
    this.newDoenca.id = Date.now();

    this.strorageService.cadatrarDoenca(this.newDoenca).then(doenca => {
      this.newDoenca = <Doenca>{};
      this.loadDoencas();
    });

  }

  updateDoenca(doenca: Doenca){
    
    doenca.title = 'UPDATE: ${doenca.title}';
    doenca.modified = Date.now();

    this.strorageService.updateDoencas(doenca).then(doenca => {
      this.mylist.closeSlidingItems();
      this.loadDoencas();
    });

  }

  deleteDoenca(doenca: Doenca){
    this.strorageService.deleteDoencas(doenca.id).then(() => {
      this.mylist.closeSlidingItems();
      this.loadDoencas();
      this.strorageService.deleteDoencas(doenca.id);
    });
  }

  deletarContato(contato: Contato){
    this.strorageService.deleteContato(contato.id).then(contato => {
      this.mylist.closeSlidingItems();
      this.loadContatos();
    });
  }

  ionViewWillEnter(){
    this.loadDoencas();
    this.loadContatos();
  }

}
