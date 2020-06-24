import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Interfaces
import { User } from '../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  pessoas: User[] = [];

  constructor(private alertController: AlertController, private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {}

/////////    // passa objeto para o método que acessa a api
/////////    this.authService.logar(login)
/////////      .subscribe((result) => { // callback com os dados
/////////        // se fosse uma lista
/////////        // this.pessoas = result;


  edit(user: User) {
    this.router.navigate(['/user'])
  }

  async presentAlert(user: User) {
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
