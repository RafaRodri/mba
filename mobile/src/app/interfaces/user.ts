import { Profile } from './profile';
import { App } from './app';

// Interface de usuário
export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  data_nascimento: Date;
  profile_id: number;
  profile: Profile;
  apps: App;
  password: string;
}