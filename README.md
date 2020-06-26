# Desafio - MBA Mobi

Neste projeto, foi construída uma API para persistir operações no banco de dados, utilizando o Laravel Framework (v.5.7) e uma aplicação, utilizando o Ionic Framework (v.5.2).

## Iniciando o servidor da API
<ul>
  <li>Crie um banco de dados MySQL com as seguintes configurações:</li>
</ul>

    Database: mba
    Username: root
    Password: mysql
  
<ul>  
    <ul>
      <li>Ou acesse o arquivo `/backend.env` e insira suas próprias credenciais de acesso.</li>
    </ul>
</ul>

<ul>
  <li>Em seu terminal:</li>
    <ul>
      <li>Acesse a pasta `mba/backend`.</li>
      <li>Execute: `composer.install`</li>    
      <li>Execute: `php artisan migrate:refresh --seed`</li>
      <li>Execute: `php artisan serve`</li>
    </ul>
</ul>

### Acessando a API

Método | Endpoint | Ação | Exemplo |
| --- | --- | --- | --- |
| POST | **api/auth/login** | Autentica usuário e gera token |  `http://localhost:8000/api/auth/login` |
| POST | **api/auth/logout** | Inválida o token |  `http://localhost:8000/api/auth/logout ` |
| GET | **api/apps** | Retorna todos os apps |  `http://localhost:8000/api/apps` |
| GET | **api/apps/{id}** | Retorna app específico |  `http://localhost:8000/api/apps/1 ` |
| POST | **api/apps** | Cadastra novo app |  `http://localhost:8000/api/apps ` |
| PUT | **api/apps/{id}** | Atualiza dados de app específico |  `http://localhost:8000/api/apps/1 ` |
| DELETE | **api/apps/{id}** | Deleta app específico |  `http://localhost:8000/api/apps/1 ` |
| GET | **api/profiles** | Retorna todos os perfis |  `http://localhost:8000/api/profiles` |
| GET | **api/profiles/{id}** | Retorna perfil específico |  `http://localhost:8000/api/profiles/1 ` |
| POST | **api/profiles** | Cadastra novo perfil |  `http://localhost:8000/api/profiles ` |
| PUT | **api/profiles/{id}** | Atualiza dados de perfil específico |  `http://localhost:8000/api/profiles/1 ` |
| DELETE | **api/profiles/{id}** | Deleta perfil específico |  `http://localhost:8000/api/profiles/1 ` |
| GET | **api/users** | Retorna todos os usuários |  `http://localhost:8000/api/users` |
| GET | **api/users/{id}** | Retorna usuário específico (informando ID ou CPF) |  `http://localhost:8000/api/users/1 ` |
| POST | **api/users** | Cadastra novo usuário |  `http://localhost:8000/api/users ` |
| PUT | **api/users/{id}** | Atualiza dados de usuário específico |  `http://localhost:8000/api/users/1 ` |
| DELETE | **api/users/{id}** | Deleta usuário específico |  `http://localhost:8000/api/users/1 ` |

## Iniciando a aplicação
<ul>
    <li>Acesse os arquivos `/mobile.environment.ts` e `/mobile.environment.prod.ts` e insira o link da sua api (em desenvolvimento e produção, respectivamente).</li>
    <li>Em seu terminal:</li>
      <ul>
      <li>Acesse a pasta `mba/mobile`.</li>
      <li>Execute: `npm install`</li>    
      <li>Execute: `ionic serve`</li>
      </ul>
</ul>

### Acessando a aplicação

<ul>
    <li>Para acessar a aplicação como administrador, poderá utilizar o usuário teste:</li>
      <ul>
      <li>CPF: 12345678912</li>
      <li>Senha: 123</li>    
      </ul>
</ul>