import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioPersonaComponent } from './components/formulario-persona/formulario-persona.component';
import { ModeloGraficoComponent } from './components/modelo-grafico/modelo-grafico.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CapturaPersonaComponent } from './pages/captura-persona/captura-persona.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    FormularioPersonaComponent,
    ModeloGraficoComponent,
    NavbarComponent,
    CapturaPersonaComponent,
    GraficasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
