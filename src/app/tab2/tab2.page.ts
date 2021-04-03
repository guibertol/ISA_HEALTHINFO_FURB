import { Component, ViewChild } from '@angular/core';
import { Doenca, Contato, Medicamento, Alergia, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList,} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  doenca: Doenca = <Doenca>{};
  contato: Contato = <Contato>{};
  medicamento: Medicamento = <Medicamento>{};
  alergia: Alergia = <Alergia>{};

  @ViewChild('mylist') mylist: IonList;

  constructor(private storageService: StorageService, private plt: Platform, public toastController: ToastController) {
    /*this.plt.ready().then(() => {
      this.loadItems
    });*/
  }

  cadastrarDoenca(){
    this.doenca.modified = Date.now();
    this.doenca.id = Date.now();

    this.storageService.cadastrarDoenca(this.doenca).then(item => {
      this.doenca = <Doenca>{};
    });

   this.exibir_mensagem('Doença salva com sucesso.');

  }

  cadastrarAlergia(){
    this.alergia.modified = Date.now();
    this.alergia.id = Date.now();

    this.storageService.cadastrarAlergia(this.alergia).then(item => {
      this.alergia = <Alergia>{};
    });

   this.exibir_mensagem('Alergia salva com sucesso.');

  }

  cadastrarContato(){

    this.contato.modified = Date.now();
    this.contato.id = Date.now();
    this.storageService.cadastrarContato(this.contato).then(item => {
      this.contato = <Contato>{};
    });

    this.exibir_mensagem('Contato salvo com sucesso.');

  }

  cadastrarMedicamento(){

    this.medicamento.modified = Date.now();
    this.medicamento.id = Date.now();
    this.storageService.cadastrarMedicamento(this.medicamento).then(item => {
      this.medicamento = <Medicamento>{};
    });

    this.exibir_mensagem('Medicamento salvo com sucesso.');

  }

  async exibir_mensagem(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}
