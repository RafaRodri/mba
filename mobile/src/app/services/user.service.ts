import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Interfaces
import { User } from '../interfaces/user';

// Chaves para armazenamento no local storage
export const USER = '_mbaRafael_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // Busca Todos os Usuários
  getUsers() {
    return this.httpClient.get<User[]>(environment.apiUrl + '/users');
  }

  // Busca Usuário por ID
  getUserById(id: number) {
    return this.httpClient.get<User>(environment.apiUrl + '/users/' + id);
  }

  // Busca Usuário por CPF
  getUserByCpf(cpf: string) {
    return this.httpClient.get<User>(environment.apiUrl + '/users/' + cpf);
  }

  // Cadastra Usuário
  postUser(user: User) {
    return this.httpClient.post<User>(environment.apiUrl + '/users', user);
  }

  // Update de Usuário
  updateUser(user: User) {
    return this.httpClient.put<User>(environment.apiUrl + '/users/' + user.id, user);
  }

  // Deleta Usuário (retorna id do usuário deletado)
  deleteUser(id: number) {
    return this.httpClient.delete<User>(environment.apiUrl + '/users/' + id);
  }

  // Armazena dados do usuário em local storage
  setUser(user: User) {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  // Retorna dados do usuário armazenado em local storage
  getUser() {
    return JSON.parse(localStorage.getItem(USER));
  }

  // Apaga dados do usuário do local storage
  clearUser() {
    localStorage.removeItem(USER);
  }
}
