import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from '../../app.tokens';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private userDataSource = new BehaviorSubject<User | null>(null);
  userDataChanges$ = this.userDataSource.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) { }

  changeUserData(data: User | null): void {
    localStorage.setItem('userData', JSON.stringify(data));
    this.userDataSource.next(data);
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
