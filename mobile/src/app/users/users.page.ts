import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Provider
import { UsersService } from './users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any[];

  constructor(private alertController: AlertController, private router: Router,
    private toastController: ToastController, private usersService: UsersService) { }

  ngOnInit() {
    this.users = [];
    this.getAllUsers();
  }

  getAllUsers() {
    //this.usersService.getAll()
    //  .then((result: any) => { //populando o objeto
    //    this.users = result.data;
    //  })
    //  .catch(async error => {
    //    console.log('catch');
    //    const toast = await this.toastController.create({
    //      message: 'Erro ao listar os usuários. Erro: ' + error.error,
    //      position: 'bottom',
    //      duration: 3000
    //    });
    //    await toast.present();
    //  });
  }

  edit(user: any) {
    //this.navCtrl.push('UserPage', {user: user});
    this.router.navigate(['/user'])
  }

  async delete(user: any) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Espera!',
      subHeader: 'Realmente quer apagar esse registro?',
      message: 'Esta ação não poderá ser desfeita.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
