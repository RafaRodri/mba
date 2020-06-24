import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;
  constructor(private authService: AuthService, private menuController: MenuController) { }

  ngOnInit() {
    // cria objeto com dados do usuário logado
    this.user = this.authService.getUser();
  }

  ionViewDidEnter() {
    // ativa sidemenu (inativo na tela de login)
    this.menuController.enable(true);
  }

}
