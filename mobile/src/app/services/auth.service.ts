import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { stringify } from 'querystring';
import { error } from 'protractor';

// Interfaces
import { Login } from '../interfaces/login';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';

export const TOKEN_AUTH = '_mbaRafael_tokenAuthorization';
export const USER = '_mbaRafael_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  logar(login: Login) {
    return this.httpClient.post<AuthResponse>(environment.apiUrl + '/auth/login', login);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_AUTH, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN_AUTH);
  }

  clearToken() {
    localStorage.removeItem(TOKEN_AUTH);
  }

  getUserByCpf(cpf: string) {
    return this.httpClient.get<User>(environment.apiUrl + '/users/' + cpf);
  }

  setUser(user: User) {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem(USER));
  }

  isLogged() {
    return !!this.getToken();
  }
}
