import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BASE_URL} from '../../app.tokens';
import {environment} from '../../../environments/environment';
import { Demande } from 'src/app/entities/demande';
import { String, StringBuilder } from 'typescript-string-operations';
import { UserService } from 'src/app/admin/services/user.service';
import { User } from 'src/app/entities/user';



@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private searchResultSource = new BehaviorSubject(null);
  searchResultChanges$ = this.searchResultSource.asObservable();

  // @ts-ignore
  template1: string = require('../../../assets/templates/template1.html');
  // @ts-ignore
  template2: string = require('../../../assets/templates/template2.html');

  // ***********************************************************************

  constructor(private http: HttpClient, private usersService: UserService, @Inject(BASE_URL) private baseUrl: string) {
   }

  // ***********************************************************************

  /**
   * Requête d'envoi de mail via l'API Symfony
   */
  sendEmail(mailData: any): Observable<any>  {
    const serviceUrl = this.baseUrl + '/api/email';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<any>(serviceUrl, mailData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // ***********************************************************************

  /**
   * Retourne le template correspondant aux numéros template et id de demande
   */
  generateTemplateFromDemande(numeroTemplate: number, numeroDemande: number) {
    switch (numeroTemplate) {
      case 1:
        return String.Format(this.template1, numeroDemande);
      case 2:
        const lien: string = String.Format('http://localhost:4200/suiviDemande/{0}', numeroDemande);
        return String.Format(this.template2, numeroDemande, lien);
      default:
        return null;
    }
  }

  // ***********************************************************************

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
