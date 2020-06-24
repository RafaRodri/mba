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

// Chaves para armazenamento no local storage
export const TOKEN_AUTH = '_mbaRafael_tokenAuthorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // Acessa endpoint de login
  logar(login: Login) {
    return this.httpClient.post<AuthResponse>(environment.apiUrl + '/auth/login', login);
  }

  // Armazena token em local storage
  setToken(token: string) {
    localStorage.setItem(TOKEN_AUTH, token);
  }

  // Retorna token armazenado em local storage
  getToken() {
    return localStorage.getItem(TOKEN_AUTH);
  }
  
  // Apaga token do local storage
  clearToken() {
    localStorage.removeItem(TOKEN_AUTH);
  }

  // Verifica se existe um token armazenado em local storage e retorna um valor boolean
  isLogged() {
    return !!this.getToken();
  }
}
