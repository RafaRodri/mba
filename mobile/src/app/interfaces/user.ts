import { Profile } from './profile';
import { Apps } from './apps';

// Interface de usuário
export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  data_nascimento: Date;
  profile: Profile;
  apps: Apps;
}