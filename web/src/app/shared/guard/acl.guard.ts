import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AclGuard {

    constructor(private oauthService: OAuthService) {}

    isChefDeProjet(): boolean {
        let claims: any;
        claims = this.oauthService.getIdentityClaims();

        return ((claims.realgroups.indexOf('/Chef de projet')) && this.oauthService.hasValidAccessToken());
    }

    isChefDeFile(): boolean {
      let claims: any;
      claims = this.oauthService.getIdentityClaims();

      return ((claims.realgroups.indexOf('/Chef de file')) && this.oauthService.hasValidAccessToken());
    }

    isExpert(): boolean {
      let claims: any;
      claims = this.oauthService.getIdentityClaims();

      return ((claims.realgroups.indexOf('/Expert')) && this.oauthService.hasValidAccessToken());
    }

    isConsultant(): boolean {
        let claims: any;
        claims = this.oauthService.getIdentityClaims();

        return ((claims.realgroups.indexOf('/Consultation') > -1) && this.oauthService.hasValidAccessToken());
    }

    isEditor(): boolean {
        let claims: any;
        claims = this.oauthService.getIdentityClaims();

        return ((claims.realgroups.indexOf('/Edition') > -1) && this.oauthService.hasValidAccessToken());
    }

}
