import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpBaseInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let customRequest = request;

    customRequest = request.clone({
      setHeaders: {
        'Content-Type':'application/json; charset=utf-8',
        'X-Auth': 'App'
      },
    });

    return next.handle(customRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.toastrService.error('Server Error 401')
          };

          return throwError(err);
        })
    );
  }
}
