import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: NotfoundComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes /*,{enableTracing: true} */)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
