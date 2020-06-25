import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

// Services
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

// Interfaces
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: User;

  constructor(private userService: UserService, private authService: AuthService,
    private menuController: MenuController, private router: Router, private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() { }

  ionViewDidEnter() {
    // Ativa sidemenu (inativo na tela de login)
    this.menuController.enable(true);

    // Cria objeto com dados do usuário logado
    this.user = this.userService.getUser();
    
    // Busca na API, todos os dados do usuário logado
    this.userService.getUserByCpf(this.user.cpf).subscribe((result) => {
      this.user = result;
    }, (error) => {
      this.authService.clearToken();
      this.router.navigate(['/login']);
    });
  }

  // Clique no botão "atualizar cadastro"
  async editar(id: string) {
    this.router.navigate(['user/edit/' + id]);
    return;
  }

  // Realiza logout
  async logout() {
    this.authService.clearToken();
    this.router.navigate(['login']);
    return;
  }

  // Clique no botão "excluir conta"
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
              // se o cadastro alterado, for do usuário logado, faz o logout
              if (this.userService.getUser().cpf == this.user.cpf) {
                this.logout();
                this.presentToast('success', 2000, 'Sua conta foi removida com sucesso.');
              }

            }, (error) => {
              this.presentToast('danger', 2000, 'Ocorreu um erro inesperado. <br>Tente novamente.');
            });
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
