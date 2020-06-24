// Interface para a resposta que será retornada do servidor de autenticação
export interface AuthResponse {
  id: number,
  cpf: string,
  access_token: string,
  expires_in: number
}