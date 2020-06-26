import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public profileLogged: number;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Início',
      url: '/home',
      icon: 'home',
      permissionRequired: '0'
    },
    {
      title: 'Usuários',
      url: '/users',
      icon: 'person',
      permissionRequired: '2'
    },
    {
      title: 'Aplicativos',
      url: '/apps',
      icon: 'apps',
      permissionRequired: '2'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    // Recupera nível de acesso do usuário logado
    this.profileLogged = this.userService.getProfile()
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
