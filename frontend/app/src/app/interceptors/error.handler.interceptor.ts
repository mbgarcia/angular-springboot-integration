import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    const notificationService = inject(NotificationService);
  
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro inesperado.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          if (error.status === 422) {
            errorMessage = error.error['message'];
          }
        }

        notificationService.showMessage(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
}
