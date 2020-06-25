import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

// Services
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';
import { ProfileService } from 'src/app/services/profile.service';

// Interfaces
import { User } from 'src/app/interfaces/user';
import { App } from 'src/app/interfaces/app';
import { Profile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  userId: number;

  user: User
  profiles: Profile[] = []
  apps: App[] = []

  formUser: FormGroup;

  constructor(private userService: UserService, private appService: AppService, private profileService: ProfileService,
    private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastController: ToastController, private loadingController: LoadingController) {
    this.formUser = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      cpf: new FormControl('', [Validators.required]),
      rg: new FormControl(''),
      data_nascimento: new FormControl(''),
      profile_id: new FormControl(''),
      apps: new FormControl([]),
    });
  }

  ngOnInit() {
    // Recupera id do usuário selecionado
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      this.getUserById(this.userId);
    });

    // Recupera todos perfis cadastrados
    this.profileService.getProfiles().subscribe((result) => {
      this.profiles = result;
    });

    // Recupera todos aplicativos cadastrados
    this.appService.getApps().subscribe((result) => {
      this.apps = result;
    });
  }

  async cadastrar() {
    // verifica se o formulário atendeu as validações
    if (this.formUser.invalid) {
      this.presentToast('danger', 2000, 'Dados incorretos.');
      return; //encerra tentativa de login
    }

    // armazena dados informados em um objeto e os passa para o método que acessa a api
    let user: User = this.formUser.getRawValue();
    user.id = this.userId;  // atribui ID da página ao objeto user
    this.presentLoading();
    this.userService.updateUser(user).subscribe((result: User) => {

      // se o cadastro alterado, for do usuário logado, faz o update do registro armazenado no local storage
      if (this.userService.getUser().cpf == user.cpf) {
        this.userService.setUser(user);
      }

      // mensagem de atualização realizada com sucesso
      this.presentToast('success', 2000, 'Dados atualizados com sucesso.');

      // fecha animação de loading e apresenta mensagem ao usuário
      this.loadingController.dismiss();
      return;
    }, (error) => { // erro no update do usuário
      // fecha animação de loading e apresenta mensagem ao usuário
      this.loadingController.dismiss();
      this.presentToast('danger', 2000, 'Ocorreu um erro ao cadastrar suas informações. <br>Tente novamente ou crie um nova conta.');
    });
  }

  async getUserById(userId: number) {
    // cria objeto com dados do usuário selecionado
    this.userService.getUserById(userId).subscribe((result: User) => {
      this.user = result;
      this.formUser.reset(this.user);
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
