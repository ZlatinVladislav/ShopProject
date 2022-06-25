import { ToastrService } from 'ngx-toastr';
import { ObservableInput, OperatorFunction, ObservedValueOf, catchError, throwError } from 'rxjs';

export function handleError<T, O extends ObservableInput<any>>(
  toastr: ToastrService,
): OperatorFunction<T, T | ObservedValueOf<O>> {
  return catchError((error) => {
    const errorMessage = error.message
      ? error.message
      : 'Error happen check console for additional information '.concat(error.status);
    toastr.error(errorMessage);
    console.log(error);
    return throwError(() => error);
  });
}
