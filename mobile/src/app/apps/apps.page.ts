import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.page.html',
  styleUrls: ['./apps.page.scss'],
})
export class AppsPage implements OnInit {

  public apps = [
    {
      title: 'Aplicativo A'
    },
    {
      title: 'Aplicativo B'
    },
    {
      title: 'Aplicativo C'
    },
    {
      title: 'Aplicativo D'
    },
    {
      title: 'Aplicativo E'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
