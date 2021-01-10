import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppContainerComponent} from './app-container/app-container.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthGuardService} from './AuthGuardService';


const routes: Routes = [{
  path: '',
  component: AppContainerComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'login',
  component: SignInComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
