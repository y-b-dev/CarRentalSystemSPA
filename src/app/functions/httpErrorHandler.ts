import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export function handleHttpError<T>(op: string) {
    return (err: HttpErrorResponse): Observable<T> => {
        const body = err.error;
        if (err.error instanceof ErrorEvent) {
            console.error(`An error occured with ${op}: ${body.message}`)
        }
        else {
            console.error(`Backend returned code ${err.status}, body was ${body}`);
        }
        return throwError(err);
    };
}