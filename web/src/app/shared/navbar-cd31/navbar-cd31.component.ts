import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {AclGuard} from '../guard/acl.guard';
import {MatSnackBar} from '@angular/material/snack-bar';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-navbar-cd31',
  templateUrl: './navbar-cd31.component.html',
  styleUrls: ['./navbar-cd31.component.scss', '../../../assets/css/style-wp.css', '../../../assets/css/style-custom.css']
})
export class NavbarCD31Component implements OnInit {

  role: AclGuard;
  message = 'Synchronisation';

  @Input() titre = '';

  @Output() logOut: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('template') template: TemplateRef<any>;
  constructor(
    private oauthService: OAuthService,
    private snackBar: MatSnackBar,
    private aclGuard: AclGuard
  ) {
    this.role = aclGuard;
  }

  ngOnInit() {
  }

  logout(message: string) {
    console.log(message);
    this.oauthService.logOut();
    localStorage.clear();
  }

}
