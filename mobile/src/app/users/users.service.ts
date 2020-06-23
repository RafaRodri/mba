import { Injectable } from '@angular/core';

// Trabalhar com requisições HTTP
import { HttpClient } from '@angular/common/http';

// Operador para executar efeitos ao assinar os observáveis ​​retornados pelos métodos HttpClient
import { tap, map } from 'rxjs/operators';

// Para trabalhar com operações assíncronas
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  // URL da API
  private API_URL = 'http://localhost:8000/api' // /users

  // Observável que será usado para assinar o estado de autenticação
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  getAll() {
    //return this.httpClient.get<any>(`${this.API_URL}/users`).pipe(  // função 'pipe()' para encadear operadores
    //  // Persistir informações JWT
    //  tap(async (result: any) => {
    //    //console.log(result);
    //    if (result.user) {
//
    //      // Armazenar informações JWT no armazenamento local
    //      await this.storage.set("ACCESS_TOKEN", result.user.access_token);  // Token de acesso
    //      await this.storage.set("EXPIRES_IN", result.user.expires_in);      // Data de validade
    //      this.authSubject.next(true);
    //    }
    //  })
    //);

    //return new Promise((resolve, reject) => {
    //  let url = this.API_URL + '/users'
//
    //  this.httpClient.get(url)
    //    .subscribe((result: any) => {
    //      resolve(result.json());
    //    },
    //    (error) => {
    //      reject(error.json());
    //    });
    //});
  }

  // GET (id)
  // CREATE
  // UPDATE
  // DELETE
}
