import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Service
import { UserService } from '../services/user.service';

// Interfaces
import { User } from '../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  userLogged: User;
  profileLogged: number;
  users: User[] = [];

  constructor(private alertController: AlertController, private router: Router,
    private toastController: ToastController, private userService: UserService) { }

  ngOnInit() {
    // Recupera usuário logado
    this.userLogged = this.userService.getUser();

    // Recupera nível de acesso do usuário logado
    this.profileLogged = this.userService.getProfile()
}

  ionViewDidEnter() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
    }, (error) => {
      this.presentToast('danger', 2000, 'Nenhum registro encontrado.');
    });
  }

  // Clique no botão "editar"
  async editar(id: number) {
    this.router.navigate(['user/edit/' + id]);
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
            this.userService.deleteUser(id).subscribe((result) => {
              this.presentToast('success', 2000, 'Usuário removido com sucesso.');
            }, (error) => {
              this.presentToast('danger', 2000, 'Ocorreu um erro inesperado. <br>Tente novamente.');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // Adiciona usuário
  async newUser() {
    this.router.navigate(['user']);
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
