import { Routes, RouterModule } from '@angular/router';

import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

const routes: Routes = [
  {path: '', component: PesquisaComponent},
  {path: 'favoritos', component: FavoritosComponent},
];

export const routing = RouterModule.forRoot(routes);
