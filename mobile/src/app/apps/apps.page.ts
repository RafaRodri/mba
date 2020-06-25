import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Service
import { AppService } from '../services/app.service';

// Interfaces
import { App } from '../interfaces/App';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.page.html',
  styleUrls: ['./apps.page.scss'],
})
export class AppsPage implements OnInit {

  apps: App[] = [];

  constructor(private alertController: AlertController, private router: Router,
    private toastController: ToastController, private appService: AppService) { }


  ngOnInit() { }

  ionViewDidEnter() {
    this.appService.getApps().subscribe((result) => {
      this.apps = result;
    }, (error) => {
      this.presentToast('danger', 2000, 'Nenhum registro encontrado.');
    });
  }


  // Clique no botão "editar"
  async editar(id: number) {
    this.router.navigate(['app/' + id]);
    return;
  }

  // Clique no botão "apagar"
  async confirmarExclusao(id: number) {
    const alert = await this.alertController.create({
      header: 'Espera!',
      subHeader: 'Realmente quer excluir esse registro?',
      message: 'Esta ação não poderá ser desfeita.',
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.appService.deleteApp(id).subscribe((result) => {
              this.presentToast('success', 2000, 'App removido com sucesso.');
            }, (error) => {
              this.presentToast('danger', 2000, 'Ocorreu um erro inesperado. <br>Tente novamente.');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // Adiciona aplicativo
  async newApp() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        // multiline input.
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        },
        {
          name: 'name8',
          type: 'password',
          placeholder: 'Advanced Attributes',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(color: string, duration: number, message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color
    });
    toast.present();
  }

}
