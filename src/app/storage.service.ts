import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

export interface Doenca{
  id: number;
  modified: number;
  title: string;
  desc: string;
}

export interface Contato {
  id: number;
  modified: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface Medicamento {
  id: number;
  modified: number;
  nome: string;
  desc: string;
}

//

const DOENCA_KEY = 'doencas';
const CONTATO_KEY = 'contatos';
const MEDICAM_KEY = 'medicamentos';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, public toastController: ToastController) { }
  
  //Aqui é onde adiciona a doença
  cadastrarDoenca(novaDoenca: Doenca): Promise <any>{
    return this.storage.get(DOENCA_KEY).then((listaDoencas: Doenca[]) =>{
      if(listaDoencas){
        listaDoencas.push(novaDoenca);
        return this.storage.set(DOENCA_KEY, listaDoencas);
      }else{
        return this.storage.set(DOENCA_KEY, [novaDoenca]);
      }
    });
  }

  //Aqui lista as doenças
  async getDoencas(): Promise<Doenca[]>{
    let doencas = await this.storage.get(DOENCA_KEY);
    return doencas;
  }

  //Aqui atualiza uma doença cadastrada
  updateDoencas(novaDoenca: Doenca): Promise<any>{
    return this.storage.get(DOENCA_KEY).then((listaDoencas: Doenca[]) =>{
      if(!listaDoencas || listaDoencas.length == 0){
        //Atualizando uma doença sem ter nenhuma cadastrada
        return null;
      }

      const idUpdate = novaDoenca.id;
      const novaLista = listaDoencas.map( d => d.id === idUpdate ? novaDoenca : d);
      return this.storage.set(DOENCA_KEY, novaLista);
    });
  }


  //Aqui apaga a doenca
  async deleteDoencas(id: number): Promise<void>{
    const doencas = await this.storage.get(DOENCA_KEY);
    if(!doencas || doencas.length == 0){
      console.log('errou')
      console.log(doencas)
      return;
    }

    const toKeep: Doenca[] = doencas.filter( d => d.id !== id);
    this.exibir_mensagem('Excluido com sucesso.');
    this.storage.set(DOENCA_KEY, toKeep);
    return;
  }

  //----------------------------------------------------------------------------

  cadastrarContato(contato: Contato): Promise <any>{
    return this.storage.get(CONTATO_KEY).then((contatos: Contato[]) =>{
      if(contatos){
        contatos.push(contato);
        return this.storage.set(CONTATO_KEY, contatos);
      }else{
        return this.storage.set(CONTATO_KEY, [contato]);
      }
    });
  }

  //Aqui lista os contatos
  getContatos(): Promise<Contato[]>{
    return this.storage.get(CONTATO_KEY);
  }

  updateContatos(novoContato: Contato): Promise<any>{
    return this.storage.get(CONTATO_KEY).then((contatos: Contato[]) =>{
      if(!contatos || contatos.length == 0){
        //Atualizando uma doença sem ter nenhuma cadastrada
        return null;
      }

      const idUpdate = novoContato.id;
      const novaLista = contatos.map( c => c.id === idUpdate ? novoContato : c);
      return this.storage.set(CONTATO_KEY, novaLista);
    });
  }

  //Aqui apaga o contato
  deleteContato(id: number): Promise<Contato>{
    return this.storage.get(CONTATO_KEY).then((contatos: Contato[]) =>{
      if(!contatos || contatos.length == 0){
        return null;
      }

      const toKeep: Contato[] = contatos.filter( c => c.id !== id);
      this.exibir_mensagem('Excluido com sucesso.');
      return this.storage.set(CONTATO_KEY, toKeep);

    });
  }

  //----------------------------------------------------------------------------

  cadastrarMedicamento(novoMedicamento: Medicamento): Promise <any>{
    return this.storage.get(MEDICAM_KEY).then((listaMedicamentos: Medicamento[]) =>{
      if(listaMedicamentos){
        listaMedicamentos.push(novoMedicamento);
        return this.storage.set(MEDICAM_KEY, listaMedicamentos);
      }else{
        return this.storage.set(MEDICAM_KEY, [novoMedicamento]);
      }
    });
  }

  async getMedicamentos(): Promise<Medicamento[]>{
    let medicamentos = await this.storage.get(MEDICAM_KEY);
    return medicamentos;
  }

  updateMedicamentos(novoMedicamento: Medicamento): Promise<any>{
    return this.storage.get(MEDICAM_KEY).then((listaMedicamentos: Medicamento[]) =>{
      if(!listaMedicamentos || listaMedicamentos.length == 0){
        return null;
      }

      const idUpdate = novoMedicamento.id;
      const novaLista = listaMedicamentos.map( d => d.id === idUpdate ?
                                             novoMedicamento : d);
      return this.storage.set(MEDICAM_KEY, novaLista);
    });
  }


  async deleteMedicamentos(id: number): Promise<void>{
    const medicamentos = await this.storage.get(MEDICAM_KEY);
    if(!medicamentos || medicamentos.length == 0){
      console.log('errou')
      console.log(medicamentos)
      return;
    }

    const toKeep: Medicamento[] = medicamentos.filter( d => d.id !== id);
    this.exibir_mensagem('Excluido com sucesso.');
    this.storage.set(MEDICAM_KEY, toKeep);
    return;
  }
  
  //----------------------------------------------------------------------------

  async exibir_mensagem(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}
