import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toastController: ToastController, private authService: AuthService, private router: Router) { }

  /**
   * Intercepta requisições
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // busca token armazenado
    const token = this.authService.getToken();

    // Se existir um token, cria header "Authorization" com o token
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Se requisição realizada não for autorizada, limpa o token e redireciona para a página de login
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.clearToken();
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}