import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class ConsultationGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let claims: any;
    claims = this.oauthService.getIdentityClaims();

    if ((claims.realgroups.indexOf('/Consultation') > -1) && this.oauthService.hasValidAccessToken()) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}
