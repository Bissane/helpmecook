import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import {UserService} from '../../admin/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChefDeProjetGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router, private keycloakService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let claims: any;
    claims = this.oauthService.getIdentityClaims();

    if ((claims.realgroups.indexOf('/Chef de projet') > -1) && this.oauthService.hasValidAccessToken()) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}
