import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { InfoComponent } from './components/info/info.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

const APP_ROUTES: Routes = [
	{path:'home',component: HomeComponent},
	{path:'contacto',component: ContactoComponent},
	{path:'comentarios',component: ComentariosComponent},
	{path:'pedidos',component: PedidosComponent},
	{path:'info',component: InfoComponent},
	{path:'**', pathMatch: 'full', redirectTo:'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);