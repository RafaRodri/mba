import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Interfaces
import { App } from '../interfaces/app';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  // Busca Todos os Apps
  getApps() {
    return this.httpClient.get<App[]>(environment.apiUrl + '/apps');
  }

  // Busca App por ID
  getAppById(id: number) {
    return this.httpClient.get<App>(environment.apiUrl + '/apps/' + id);
  }

  // Cadastra App
  postApp(app: App) {
    return this.httpClient.post<App>(environment.apiUrl + '/apps', app);
  }

  // Update de App
  updateApp(app: App) {
    return this.httpClient.put<App>(environment.apiUrl + '/apps/' + app.id, app);
  }

  // Deleta App (retorna id do app deletado)
  deleteApp(id: number) {
    return this.httpClient.delete<App>(environment.apiUrl + '/apps/' + id);
  }
}
