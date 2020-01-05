import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }
  from '@angular/common/http';
  import { Router } from '@angular/router';

import { Observable } from 'rxjs'
import { tap } from "rxjs/operators";

// import 'rxjs/add/operator/do';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(private router: Router){

    }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            console.log('req url :: ' + req.url);
            if (err.status === 401) {
              this.router.navigate(['login']);
            }
          }
        }
      ));

  }
}