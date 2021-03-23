import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

export interface Item{
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

const ITEMS_KEY = 'doencas';
const ITEMS_KEY_CONTATOS = 'contatos';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, public toastController: ToastController) { }
  
  //Aqui é onde adiciona o item
  addItem(item: Item): Promise <any>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) =>{
      if(items){
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      }else{
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  cadastrarContato(contato: Contato): Promise <any>{
    return this.storage.get(ITEMS_KEY_CONTATOS).then((contatos: Contato[]) =>{
      if(contatos){
        contatos.push(contato);
        return this.storage.set(ITEMS_KEY_CONTATOS, contatos);
      }else{
        return this.storage.set(ITEMS_KEY_CONTATOS, [contato]);
      }
    });
  }

  //Aqui lista o item
  getItems(): Promise<Item[]>{
    return this.storage.get(ITEMS_KEY);
  }

  updateItem(item: Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) =>{
      if(!items || items.length == 0){
        return null;
      }

      let newItems : Item[] = [];
      for(let i of items){
        if(i.id === item.id){
          newItems.push(item);
        }else{
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);

    });
  }


  //Aqui apaga o item
  delete(id: number): Promise<Item>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) =>{
      if(!items || items.length == 0){
        return null;
      }

      let toKeep: Item[] = [];

      for(let i of items){
        if(i.id !== id){
          toKeep.push(i);
        }
      }

      this.exibir_mensagem('Excluido com sucesso.');
      return this.storage.set(ITEMS_KEY, toKeep);

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
