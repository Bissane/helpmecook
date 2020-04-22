import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../../entities/user';
import {OAuthService} from 'angular-oauth2-oidc';
import {Group} from '../../entities/group';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private kcBaseUrl = environment.apiKeycloak;
  private accessToken = '';

  constructor(private oauthService: OAuthService,
              private http: HttpClient) {
    this.accessToken = this.oauthService.getAccessToken();
  }

  // get users list Access-Control-Allow-Origin
  getUsers(...criteria): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    return this.http.get<User[]>(this.kcBaseUrl + '/users?' + criteria.join('&'), {headers: headers})
      .pipe(
        // tap(data => console.log('from Service: ', data)),
        catchError(this.handleError)
      );
  }

  getUsersPerGroup(id): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    return this.http.get<User[]>(this.kcBaseUrl + `/groups/${id}/members`, {headers: headers})
      .pipe(
        // tap(data => console.log('from Service: ', data)),
        catchError(this.handleError)
      );
  }

  // get users count
  countUsers(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    return this.http.get<number>(this.kcBaseUrl + `/users/count`, {headers: headers}).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  // get user groups by user_id
  getUserGroups(id): Observable<Group[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    return this.http.get<Group[]>(this.kcBaseUrl + `/users/${id}/groups`, {headers: headers}).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  // get user by user_id
  getUser(id): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    return this.http.get<User>(this.kcBaseUrl + `/users/${id}`, {headers: headers}).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  updateUser(uid, data): Observable<{}> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    return this.http.put<User>(this.kcBaseUrl + `/users/${uid}`,
      data,
      {headers: headers}
    ).pipe(
      tap(() => console.log('User updated')),
      catchError(this.handleError)
    );
  }

  addUser(data: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.accessToken
        })
    };
    return this.http.post<User>(this.kcBaseUrl + `/users`, {...data}, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // get groups list
  getGroups(): Observable<Group[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    return this.http.get<Group[]>(this.kcBaseUrl + `/groups`, {headers: headers}).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  // add user to group
  joinGroup(uid, gid): Observable<{}> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Group>(this.kcBaseUrl + `/users/${uid}/groups/${gid}`,
      {userId: uid, groupId: gid},
      {headers: headers}
    ).pipe(
      tap(() => console.log('group joined')),
      catchError(this.handleError)
    );
  }

  // remove user from group
  leavGroup(uid, gid): Observable<{}> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    return this.http.delete<Group>(this.kcBaseUrl + `/users/${uid}/groups/${gid}`, {headers: headers}).pipe(
      tap(() => console.log('group left')),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
