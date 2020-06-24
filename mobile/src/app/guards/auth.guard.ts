import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Guarda as rotas, permitindo apenas carregamento para quem estiver logado
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    // Se não estiver logado, redireciona para a página de login
    if (!this.authService.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
