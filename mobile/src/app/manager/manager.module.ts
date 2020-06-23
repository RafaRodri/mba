import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerPageRoutingModule } from './manager-routing.module';

import { ManagerPage } from './manager.page';
import { UsersPage } from '../users/users.page';
import { AppsPage } from '../apps/apps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerPageRoutingModule
  ],
  declarations: [ManagerPage, UsersPage, AppsPage]
})
export class ManagerPageModule {}
