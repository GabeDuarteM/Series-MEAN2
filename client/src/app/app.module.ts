import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FavoriteService } from './favorite.service';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PesquisaComponent,
    ResultadosComponent,
    ResultadoComponent,
    FavoritosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
