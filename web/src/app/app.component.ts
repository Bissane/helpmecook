import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import {Component, Input, OnInit} from '@angular/core';
import {filter, take} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, Event, NavigationEnd, NavigationError, NavigationCancel, ActivationStart } from '@angular/router';
import { User } from './entities/user';
import { UserIdleService } from 'angular-user-idle';
import {UserAuthService} from './shared/services/userAuth.service';
import {UserService} from './admin/services/user.service';
import {DemandeService} from './shared/services/demande.service';
import { EmailService } from './shared/services/email.service';
import { Demande } from './entities/demande';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userData: User | null = null;

  maDemande: Demande;

  constructor(private oauthService: OAuthService,
              private spinner: NgxSpinnerService,
              private userIdle: UserIdleService,
              private userService: UserAuthService,
              private usersService: UserService,
              private demandeService: DemandeService,
              private titleService: Title,
              private emailService: EmailService,
              private router: Router) {

    this.configureWithNewConfigApi();
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }
  @Input() titre = '';

  ngOnInit() {
    // Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    // tslint:disable-next-line:no-console
    this.userIdle.onTimerStart().subscribe(count => console.debug(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.logout('Time is up!');
    });

    this.router.events
      .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            const title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' | ');
            this.titre = title;
            this.titleService.setTitle(title);
          }
        }
      );
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof ActivationStart) {
      this.spinner.show();
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.spinner.hide();
    }
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    console.log(this.oauthService);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
          this.oauthService.initImplicitFlow();
      }
    });

    // this.oauthService.loadDiscoveryDocument().then(doc => {
    //   if (this.oauthService.redirectUri === 'http://localhost:4200/demandeLibre') {
    //     this.oauthService.tryLogin().then(_ => {
    //         if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
    //           this.oauthService.initImplicitFlow();
    //         }
    //       });
    //   }
    //   console.log(doc);
    // });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events.subscribe(e => {
      // tslint:disable-next-line:no-console
      console.debug('oauth/oidc event', e);
    });

    this.oauthService.events
        .pipe(filter(e => e.type === 'session_terminated'))
        .subscribe(e => {
          // tslint:disable-next-line:no-console
          console.debug('Your session has been terminated!');
          this.logout('Your session has been terminated!');
        });

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(() => {
        const claims: User = this.oauthService.getIdentityClaims();
        this.userData = {
          name: claims.name,
          family_name: claims.family_name,
          given_name: claims.given_name,
          preferred_username: claims.preferred_username,
          email: claims.email,
          role: claims.role,
        };
        this.userService.changeUserData(this.userData);
      });

  }

  get name() {
    const claims: User = this.oauthService.getIdentityClaims();
    return claims ? claims.name : null;
  }

  logout(message: string) {
    console.log(message);
    this.oauthService.logOut();
    localStorage.clear();
  }

  onTitle(value: string) {
    this.titre = value;
  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
