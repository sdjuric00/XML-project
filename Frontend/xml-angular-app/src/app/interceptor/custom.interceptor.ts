import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("doslo je");
    console.log(req);
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    if (accessToken) {
      console.log(accessToken);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      console.log(cloned);

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}


