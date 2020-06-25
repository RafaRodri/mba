import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Interfaces
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  // Busca Todos os Profiles
  getProfiles() {
    return this.httpClient.get<Profile[]>(environment.apiUrl + '/profiles');
  }

  // Busca Profile por ID
  getProfileById(id: number) {
    return this.httpClient.get<Profile>(environment.apiUrl + '/profiles/' + id);
  }

  // Cadastra Profile
  postProfile(profile: Profile) {
    return this.httpClient.post<Profile>(environment.apiUrl + '/profiles', profile);
  }

  // Update de Profile
  updateProfile(profile: Profile) {
    return this.httpClient.put<Profile>(environment.apiUrl + '/profiles/' + profile.id, profile);
  }

  // Deleta Profile (retorna id do profile deletado)
  deleteProfile(id: number) {
    return this.httpClient.delete<Profile>(environment.apiUrl + '/profiles/' + id);
  }
}
