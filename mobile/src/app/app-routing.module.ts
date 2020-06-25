import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./users/user/user.module').then(m => m.UserPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'user/edit/:id',
    loadChildren: () => import('./users/user/user.module').then(m => m.UserPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'apps',
    loadChildren: () => import('./apps/apps.module').then(m => m.AppsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'app',
    loadChildren: () => import('./apps/app/app.module').then(m => m.AppPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'app/edit/:id',
    loadChildren: () => import('./apps/app/app.module').then(m => m.AppPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
