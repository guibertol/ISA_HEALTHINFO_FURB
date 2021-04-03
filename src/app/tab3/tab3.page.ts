import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Doenca, Contato, StorageService } from '../storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  items: Doenca[] = [];
  exibido = false;

  constructor(private plt: Platform, private alertCtrl: AlertController, private LocalNotifications: LocalNotifications, private strorageService: StorageService) {
    this.plt.ready().then(() => {

      this.LocalNotifications.on('click').subscribe(res => {

      });

      this.LocalNotifications.on('trigger').subscribe(res => {

      });

    });
  }

  exibirnotificacao(){
    this.LocalNotifications.schedule({
      id: 1,
      text: this.verificar_doencas(),
      sound: 'file://sound.mp3',
      data: { secret: 'KEY_ISA_HEALTINFO' },
      sticky: true
    });
    this.exibido = true;
  }

  showAlert(header, sub, msg){
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  verificar_doencas(){

    var string = "";
    this.strorageService.getDoencas().then(items => {
      this.items = items;
    });

    this.items.forEach(element => {
      if(string == ""){
        string += element.title;
      }else{
        string += ", "+element.title;
      }
      

    });

    return string;

  }

  removernotificacao(){

    this.exibido = false;
    this.LocalNotifications.clearAll();

  }
  

}
