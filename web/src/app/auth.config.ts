// This api will come in the next version

import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
    // Url of the Identity Provider
    requireHttps: false,
    issuer: environment.issuer,

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/index.html',

    // URL of the SPA to redirect the user after silent refresh
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: 'helpMeCook',

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'openid profile email',

    // silentRefreshShowIFrame: true,

    showDebugInformation: true,

    sessionChecksEnabled: true
};
