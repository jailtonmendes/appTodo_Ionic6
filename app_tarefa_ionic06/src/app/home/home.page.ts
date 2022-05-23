import { TarefaService } from './../services/tarefa.service';
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { loadingController } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tarefaCollection : any[] = [];

  constructor(
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController,
    private tarefaService: TarefaService,
    private actionSheetCtrl: ActionSheetController
    ) {}


    //Assim que a página terminar de carregar
    ionViewDidEnter(){
      this.listarTarefa();
    }

    listarTarefa() {
      this.tarefaCollection = this.tarefaService.listarTarefas();
    }

    delete(item) {
      console.log(item);
      this.tarefaService.delete(item, ()=> {
        this.listarTarefa();
      });
    }

  
  async addTarefa() {
    const alert = await this.alertCtrl.create({
      header: 'Informe a tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Descreva sua tarefa'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Salvar',
          handler: (tarefa) => {
            this.tarefaService.salvar(tarefa, ()=> {
              this.listarTarefa();
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async openActions(tarefa: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O QUE DESEJA FAZER",
      buttons: [{
        text: tarefa.feito ? 'Desmarcar' : 'Marcar como realizada',
        icon: tarefa.feito ? 'checkmark-circle' : 'radio-button-off',
        handler: () => {
          tarefa.feito = !tarefa.feito;

          this.tarefaService.atualizar(tarefa, () => {
            this.listarTarefa();
          })

        }
      }, {
        text:'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  // async presentActionSheet(tarefa: any) {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'O QUE DESEJA FAZER',
  //     buttons: [{
  //       text: tarefa.feito ? 'Desmarcar' : 'Marcar como realizada',
  //       icon: tarefa.feito ? 'radio-button-off' : 'checkmark-circle',
  //       handler: () => {
  //         tarefa.feito = !tarefa.feito;

  //         this.tarefaService.atualizar(tarefa, () => {
  //           this.listarTarefa();
  //         })

  //       }
  //     },]
  //   });
  //   await actionSheet.present();

  //   const { role, data } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role and data', role, data);
  // }

}




