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
      if (params.get('id')) {
        this.appId = Number(params.get('id'));
        this.getAppById(this.appId);
      }
    });
  }

  async register() {
    // verifica se o formulário atendeu as validações
    if (this.formApp.invalid) {
      this.presentToast('danger', 2000, 'Dados incorretos.');
      return; //encerra envio de informações
    }

    // armazena dados informados em um objeto e os passa para o método que acessa a api
    let appForm: App = this.formApp.getRawValue();
    appForm.id = this.appId;  // atribui ID da página ao objeto app
    this.presentLoading();

    // Atualizar
    if (this.appId) {
      this.formUpdate(appForm);
    }
    // Cadastrar
    else {
      this.formPost(appForm);
    }
  }

  // Submete o formulário para atualização do registro
  async formUpdate(app: App) {
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

  // Submete o formulário para criar novo aplicativo
  async formPost(app: App) {
    this.appService.postApp(app).subscribe((result: App) => {
      // deixa de ser um novo cadastro e direciona para a tela de update
      this.router.navigate(['app/edit/' + result.id]);

      // mensagem de atualização realizada com sucesso
      this.presentToast('success', 2000, 'Dados atualizados com sucesso.');

      // fecha animação de loading e apresenta mensagem ao usuário
      this.loadingController.dismiss();
      return;
    }, (error) => { // erro no update
      // fecha animação de loading e apresenta mensagem ao usuário
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
      this.presentToast('danger', 2000, 'Registro não foi encontrado.');
      this.router.navigate(['home']);
      return;
    });
  }

  // Realiza logout
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
