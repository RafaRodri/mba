import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {
  segmento: string;

  constructor() { }

  ngOnInit() {
  }

  // Set segmento default, para abrir quando a página é carregada
  ionViewWillEnter() {
    this.segmento = "1";
  }

}
