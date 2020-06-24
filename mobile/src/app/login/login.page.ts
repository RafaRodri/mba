import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, LoadingController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';

// Interfaces
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  pessoas = [];

  // Injeção de dependência: toda service precisa ser injetada (agt depende dela, mas não mantém ela)
  constructor(private toastController: ToastController, private loadingController: LoadingController,
    private authService: AuthService, private router: Router, private menuController: MenuController) {
    this.formLogin = new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() { }

  ionViewDidEnter() {
    // desativa sidemenu
    this.menuController.enable(false);
  }

  async logar() {
    // verifica se o formulário atendeu as validações
    if (this.formLogin.invalid) {
      this.presentToast('Dados incorretos.');
      return; //encerra tentativa de login
    }

    // armazena dados informados em um objeto e os passa para o método que acessa a api
    let login: Login = this.formLogin.getRawValue();
    this.presentLoading();
    this.authService.logar(login).subscribe((result) => {
      // armazena token de autenticação em local storage
      this.authService.setToken(result.access_token);

      // busca dados do usuário logado
      this.authService.getUserByCpf(login.cpf)
        .subscribe((result: User) => {
          // armazena usuário em local storage e redireciona para home
          this.authService.setUser(result);
          this.router.navigate(['home']);
          return;
        }, (error) => {
          this.presentToast('Os dados não correspondem a nenhuma conta. Tente novamente ou crie um nova conta.');
        });

      // fecha animação de loading e apresenta mensagem ao usuário
      this.loadingController.dismiss();
    }, (error) => {
      // fecha animação de loading e apresenta mensagem ao usuário
      this.loadingController.dismiss();
      this.presentToast('Os dados não correspondem a nenhuma conta. Tente novamente ou crie um nova conta.');
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
