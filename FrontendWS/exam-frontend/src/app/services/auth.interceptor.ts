import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add the jwt token which is stored in localstorage\
    let authreq = req;
    const token = this.login.getToken();
    console.log('Inside interceptor');
    if (token != null) {
      authreq = authreq.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(authreq);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
