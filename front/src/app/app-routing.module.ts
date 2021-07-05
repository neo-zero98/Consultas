import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGraficasGuard } from './guards/admin-graficas.guard';
import { CheckLoginGuard } from './guards/check-login.guard';
import { NoSessionGuard } from './guards/no-session.guard';
import { CapturaPersonaComponent } from './pages/captura-persona/captura-persona.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
     {path: 'login', component: LoginComponent, canActivate: [NoSessionGuard]},
     {path: 'captura', component: CapturaPersonaComponent, canActivate:[CheckLoginGuard]},
     {path: 'graficas', component: GraficasComponent, canActivate: [AdminGraficasGuard]},
     { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
