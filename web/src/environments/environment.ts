// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Keycloak
  issuer: 'http://keycloak.local:8080/auth/realms/CD31',
  apiKeycloak: 'http://keycloak.local:8080/auth/admin/realms/CD31',
  apiUrl: 'http://api.local',
  surycatUrl: 'https://api.surycat.io',

  // Mails
  adresse_plateforme: 'plateforme.appui@cd31.fr',
  mail_Title_1: 'Réception demande n°{0}',
  attribution_1: 'Attribué chef de file',
  attribution_2: 'Attribué chef de projet',
  attribution_3: 'Attribué experts',

  // Api Wordpress

  apiWordpress: '10.89.14.101/wp-json/wp/v2'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
