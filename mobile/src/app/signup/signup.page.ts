import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

// Interfaces
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formSignup: FormGroup;

  constructor(private menuController: MenuController, private toastController: ToastController,
    private loadingController: LoadingController, private userService: UserService, private router: Router) {
    // Criação do nosso form com Reactive forms
    this.formSignup = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // desativa sidemenu
    this.menuController.enable(false);
  }

  signup() {
    // verifica se o formulário atendeu as validações
    if (this.formSignup.invalid) {
      this.presentToast('Dados incorretos.');
      return; //encerra tentativa de cadastro
    }

    // armazena dados informados em um objeto e os passa para o método que acessa a api
    let user: User = this.formSignup.getRawValue();
    this.presentLoading();
    this.userService.postUser(user).subscribe((result: User) => {
      this.router.navigate(['login']);

      // fecha animação de loading e apresenta mensagem ao usuário
      this.loadingController.dismiss();
      return;
    }, (error) => { // erro no cadastro do usuário
      // fecha animação de loading e apresenta mensagem ao usuário
      this.loadingController.dismiss();
      this.presentToast('O cadastro não pode ser realizado. <br>Confira suas informações e tente novamente.');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: 'danger'
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguardando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
