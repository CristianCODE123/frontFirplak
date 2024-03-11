import { Routes } from '@angular/router';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { PagesHomeComponent } from './pages/pages-home/pages-home.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { PortalTransporteComponent } from './forms/portal-transporte/portal-transporte.component';
import { FormPedidosComponent } from './forms/form-pedidos/form-pedidos.component';
import { GuiaTransporteComponent } from './forms/guia-transporte/guia-transporte.component';

export const routes: Routes = [
    { path: '', component: SkeletonComponent },
    {path: 'transporte', component: PortalTransporteComponent},
    {path: 'pedidos', component: FormPedidosComponent},  
    {path: 'guiaTransporte',component: GuiaTransporteComponent}
];
