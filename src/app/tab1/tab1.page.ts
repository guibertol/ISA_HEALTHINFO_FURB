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
  
  contatos: Contato[] = [];
  medicamentos: Medicamento[] = [];
  alergias: Alergia[] = [];
  doenca: Doenca;

  newDoenca: Doenca = <Doenca>{};
  newContato: Contato = <Contato>{};
  newMedicamento: Medicamento = <Medicamento>{};
  newAlergia: Alergia = <Alergia>{};

  @ViewChild('listaDoencas') listaDoencas: IonList;
  @ViewChild('listaContatos') listaContatos: IonList;
  @ViewChild('listaMedicamentos') listaMedicamentos: IonList;
  @ViewChild('listaAlergias') listaAlergias: IonList;

  constructor(private storageService: StorageService, private plt: Platform, public alertController: AlertController, public toastController: ToastController) {
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

  /*cadastrarDoenca(){
    this.newDoenca.modified = Date.now();
    this.newDoenca.id = Date.now();

    this.storageService.cadastrarDoenca(this.newDoenca).then(doenca => {
      this.newDoenca = <Doenca>{};
      this.loadDoencas();
    });

  }*/

  //Atualizar doença
  updateDoenca(doenca: Doenca){

    this.alertController.create({
      header: 'Atualizar doença',
      //subHeader: 'Aqui é um cabeçalho',
      //message: 'Aqui é uma mensagem',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome',
          value: doenca.nome
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

            doenca.nome = data.Nome;
            doenca.modified = Date.now();

            this.storageService.updateDoencas(doenca).then(doenca => {
              this.listaDoencas.closeSlidingItems();
              this.loadDoencas();
              this.exibir_mensagem('Atualizada com sucesso.');
            });

          }
        }
      ]
    }).then(res => {
      res.present();
    });

  }

  //Atualizar alergia
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
              this.exibir_mensagem('Atualizada com sucesso.');
            });

          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  //Atualizar medicamento
  updateMedicamento(medicamento: Medicamento){
    this.alertController.create({
      header: 'Atualizar medicamento',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome',
          value: medicamento.nome
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

            medicamento.nome = data.Nome;
            medicamento.modified = Date.now();

            this.storageService.updateMedicamentos(medicamento).then(medicamento => {
              this.listaMedicamentos.closeSlidingItems();
              this.loadMedicamentos();
              this.exibir_mensagem('Atualizado com sucesso.');
            });

          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  //Atualizar contato
  updateContato(contato: Contato){
    this.alertController.create({
      header: 'Atualizar contato',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome',
          value: contato.nome
        },
        {
          name: 'Email',
          placeholder: 'Digite o email',
          value: contato.email
        },
        {
          name: 'Telefone',
          placeholder: 'Digite o telefone',
          value: contato.telefone
        }
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

            contato.nome = data.Nome;
            contato.email = data.Email;
            contato.telefone = data.Telefone
            contato.modified = Date.now();

            this.storageService.updateContatos(contato).then(contato => {
              this.listaContatos.closeSlidingItems();
              this.loadContatos();
              this.exibir_mensagem('Atualizado com sucesso.');
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

  //Cadastrar doença
  cadastrarDoenca(){

    this.alertController.create({
      header: 'Cadastrar doença',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            console.log('Cancelado', data);
          }
        },
        {
          text: 'Cadastrar',
          handler: (data: any) => {
            
            this.newDoenca.nome = data.Nome;
            this.newDoenca.modified = Date.now();
            this.newDoenca.id = Date.now();

            this.storageService.cadastrarDoenca(this.newDoenca).then(doenca => {
              this.newDoenca = <Doenca>{};
              this.loadDoencas();
              this.exibir_mensagem('Doença salva com sucesso.');
            });
            
            console.log('aaaa');

          }
        }
      ]
    }).then(res => {
      res.present();
    });

  }

  //Cadastrar contato
  cadastrarContato(){
    this.alertController.create({
      header: 'Cadastrar contato',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome'
        },
        {
          name: 'Email',
          placeholder: 'Digite o email'
        }
        ,
        {
          name: 'Telefone',
          placeholder: 'Digite o telefone'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            console.log('Cancelado', data);
          }
        },
        {
          text: 'Cadastrar',
          handler: (data: any) => {
            
            this.newContato.nome = data.Nome;
            this.newContato.email = data.Email;
            this.newContato.telefone = data.Telefone;
            this.newContato.id = Date.now();

            this.storageService.cadastrarContato(this.newContato).then(doenca => {
              this.newContato = <Contato>{};
              this.loadContatos();
              this.exibir_mensagem('Contato salvo com sucesso.');
            });
            
            console.log('aaaa');

          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  //Cadastrar Medicamento
  cadastrarMedicamento(){
    this.alertController.create({
      header: 'Cadastrar medicamento',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            console.log('Cancelado', data);
          }
        },
        {
          text: 'Cadastrar',
          handler: (data: any) => {
            
            this.newMedicamento.nome = data.Nome;
            this.newMedicamento.id = Date.now();

            this.storageService.cadastrarMedicamento(this.newMedicamento).then(doenca => {
              this.newMedicamento = <Medicamento>{};
              this.loadMedicamentos();
              this.exibir_mensagem('Medicamento salvo com sucesso.');
            });
            
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  //Cadastrar alergia
  cadastrarAlergia(){
    this.alertController.create({
      header: 'Cadastrar alergia',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digite o nome'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            console.log('Cancelado', data);
          }
        },
        {
          text: 'Cadastrar',
          handler: (data: any) => {
            
            this.newAlergia.nome = data.Nome;
            this.newAlergia.id = Date.now();

            this.storageService.cadastrarAlergia(this.newAlergia).then(doenca => {
              this.newAlergia = <Alergia>{};
              this.loadAlergias();
              this.exibir_mensagem('Alergia salva com sucesso.');
            });
            
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  async exibir_mensagem(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}
