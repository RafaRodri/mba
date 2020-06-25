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
    this.router.navigate(['app/edit/' + id]);
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
    this.router.navigate(['app']);
    return;
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
