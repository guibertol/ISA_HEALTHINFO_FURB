import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

export interface Doenca{
  id: number;
  title: string;
  value: string;
  modified: number;
}

export interface Contato {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

//

const DOENCA_KEY = 'doencas';
const CONTATO_KEY = 'contatos';

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

  updateContatos(novoContato: Doenca): Promise<any>{
    return this.storage.get(CONTATO_KEY).then((contatos: Doenca[]) =>{
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

  async exibir_mensagem(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}
