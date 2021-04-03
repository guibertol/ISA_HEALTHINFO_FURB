import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

export interface Doenca{
  id: number;
  title: string;
  value: string;
  modified: number;
}

export interface Contato{
  id: number;
  nome: string;
  email: string;
  telefone: string;
}
//
const DOENCA_KEY = 'doencas';
const CONTATCT_KEY = 'contatos';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, public toastController: ToastController) { }
  
  //Aqui é onde adiciona a doença
  cadatrarDoenca(novaDoenca: Doenca): Promise <any>{
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

      //TODO: this process to update the list could be better 
      let newItems : Doenca[] = [];
      for(let i of listaDoencas){
        if(i.id === novaDoenca.id){
          newItems.push(novaDoenca);
        }else{
          newItems.push(i);
        }
      }

      return this.storage.set(DOENCA_KEY, newItems);

    });
  }


  //Aqui apaga a doenca
  deleteDoencas(id: number): Promise<Doenca>{
    return this.storage.get(DOENCA_KEY).then((doencas: Doenca[]) =>{
      if(!doencas || doencas.length == 0){
          //Removendo uma doença sem doenaças cadatradas.
        return null;
      }

      let toKeep: Doenca[] = [];

      //TODO: this process to update the list could be better 
      for(let i of doencas){
        if(i.id !== id){
          toKeep.push(i);
        } } 
      this.exibir_mensagem('Excluido com sucesso.');
      return this.storage.set(DOENCA_KEY, toKeep);

    });
  }

  //----------------------------------------------------------------------------

  cadastrarContato(contato: Contato): Promise <any>{
    return this.storage.get(CONTATCT_KEY).then((contatos: Contato[]) =>{
      if(contatos){
        contatos.push(contato);
        return this.storage.set(CONTATCT_KEY, contatos);
      }else{
        return this.storage.set(CONTATCT_KEY, [contato]);
      }
    });
  }

  //Aqui lista os contatos
  getContatos(): Promise<Contato[]>{
    return this.storage.get(CONTATCT_KEY);
  }

  //Aqui apaga o contato
  deleteContato(id: number): Promise<Contato>{
    return this.storage.get(CONTATCT_KEY).then((contatos: Contato[]) =>{
      if(!contatos || contatos.length == 0){
        return null;
      }

      let toKeep: Contato[] = [];

      for(let i of contatos){
        if(i.id !== id){
          toKeep.push(i);
        }
      }

      this.exibir_mensagem('Excluido com sucesso.');
      return this.storage.set(CONTATCT_KEY, toKeep);

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
