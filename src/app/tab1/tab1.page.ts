import { Component, ViewChild } from '@angular/core';
import { Doenca, Contato, Medicamento, Alergia, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  doencas: Doenca[] = [];
  newDoenca: Doenca = <Doenca>{};
  contatos: Contato[] = [];
  medicamentos: Medicamento[] = [];
  alergias: Alergia[] = [];

  @ViewChild('listaDoencas') listaDoencas: IonList;
  @ViewChild('listaContatos') listaContatos: IonList;
  @ViewChild('listaMedicamentos') listaMedicamentos: IonList;
  @ViewChild('listaAlergias') listaAlergias: IonList;

  constructor(private storageService: StorageService, private plt: Platform, public alertController: AlertController) {
    this.loadDoencas();
    this.loadContatos();
    this.loadAlergias();
  }

  loadDoencas(){
    this.storageService.getDoencas().then(doencas => {
      this.doencas = doencas;
    });
  }

  loadContatos(){
    this.storageService.getContatos().then(contatos => {
      this.contatos = contatos;
    });
  }

  loadAlergias(){
    this.storageService.getAlergias().then(alergias => {
      this.alergias = alergias;
    });
  }

  async loadMedicamentos() {
    this.medicamentos = await this.storageService.getMedicamentos();
  }

  cadastrarDoenca(){
    this.newDoenca.modified = Date.now();
    this.newDoenca.id = Date.now();

    this.storageService.cadastrarDoenca(this.newDoenca).then(doenca => {
      this.newDoenca = <Doenca>{};
      this.loadDoencas();
    });

  }

  updateDoenca(doenca: Doenca){

    this.alertController.create({
      header: 'Atualizar doença',
      //subHeader: 'Aqui é um cabeçalho',
      //message: 'Aqui é uma mensagem',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome',
          value: doenca.title
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            console.log('Cancelado', data);
          }
        },
        {
          text: 'Atualizar',
          handler: (data: any) => {
            console.log('Informações salvas', data);

            doenca.title = data.Nome;
            doenca.modified = Date.now();

            this.storageService.updateDoencas(doenca).then(doenca => {
              this.listaDoencas.closeSlidingItems();
              this.loadDoencas();
            });

          }
        }
      ]
    }).then(res => {
      res.present();
    });

  }

  updateAlergia(alergia: Alergia){
    this.alertController.create({
      header: 'Atualizar alergia',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome',
          value: alergia.nome
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            console.log('Cancelado', data);
          }
        },
        {
          text: 'Atualizar',
          handler: (data: any) => {
            console.log('Informações salvas', data);

            alergia.nome = data.Nome;
            alergia.modified = Date.now();

            this.storageService.updateAlergias(alergia).then(alergia => {
              this.listaAlergias.closeSlidingItems();
              this.loadAlergias();
            });

          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  deleteDoenca(doenca: Doenca){
    this.storageService.deleteDoencas(doenca.id).then(() => {
      this.listaDoencas.closeSlidingItems();
      this.loadDoencas();
    });
  }

  deletarContato(contato: Contato){
    this.storageService.deleteContato(contato.id).then(contato => {
      this.listaContatos.closeSlidingItems();
      this.loadContatos();
    });
  }

  deleteAlergia(alergia: Alergia){
    this.storageService.deleteAlergia(alergia.id).then(alergia => {
      this.listaAlergias.closeSlidingItems();
      this.loadAlergias();
    });
  }

  async deleteMedicamento(medicamento: Medicamento) {
    await this.storageService.deleteMedicamentos(medicamento.id);
    this.listaMedicamentos.closeSlidingItems();
    this.loadMedicamentos();
  }

  ionViewWillEnter(){
    this.loadDoencas();
    this.loadContatos();
    this.loadMedicamentos();
    this.loadAlergias();
  }

}
