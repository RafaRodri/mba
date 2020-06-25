import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

// Services
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

// Interfaces
import { App } from 'src/app/interfaces/app';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
})
export class AppPage implements OnInit {

  appId: number;
  app: App
  formApp: FormGroup;

  constructor(private appService: AppService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastController: ToastController, private loadingController: LoadingController) {
    this.formApp = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      bundle_id: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    // Recupera id do app selecionado
    this.activatedRoute.paramMap.subscribe(params => {
      this.appId = Number(params.get('id'));
      this.getAppById(this.appId);
    });
  }

  async cadastrar() {
    // verifica se o formulário atendeu as validações
    if (this.formApp.invalid) {
      this.presentToast('danger', 2000, 'Dados incorretos.');
      return; //encerra tentativa de login
    }

    // armazena dados informados em um objeto e os passa para o método que acessa a api
    let app: App = this.formApp.getRawValue();
    app.id = this.appId;  // atribui ID da página ao objeto app

    this.presentLoading();
    this.appService.updateApp(app).subscribe((result: App) => {

      // mensagem de atualização realizada com sucesso
      this.presentToast('success', 2000, 'Dados atualizados com sucesso.');

      // fecha animação de loading e apresenta mensagem ao app
      this.loadingController.dismiss();
      return;
    }, (error) => { // erro no update do app
      // fecha animação de loading e apresenta mensagem ao app
      this.loadingController.dismiss();
      this.presentToast('danger', 2000, 'Ocorreu um erro ao cadastrar suas informações. <br>Tente novamente ou crie um nova conta.');
    });
  }

  async getAppById(appId: number) {
    // cria objeto com dados do app selecionado
    this.appService.getAppById(appId).subscribe((result: App) => {
      this.app = result;
      this.formApp.reset(this.app);
    }, (error) => {
      this.presentToast('danger', 2000, 'Ocorreu um erro inesperado. <br>Tente novamente.');
      this.router.navigate(['home']);
      return;
    });
  }

  async logout() {
    this.authService.clearToken();
    this.router.navigate(['login']);
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguardando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
