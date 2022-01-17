import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { DominicodeComponent } from './pages/dominicode/dominicode.component';

const routes: Routes = [
  // Ruta para que me redirija al componente Dominicode =>  http://localhost:4200/dominicode
  //{ path: 'dominicode', component: DominicodeComponent},
  { path: '', redirectTo: 'products', pathMatch: 'full'}, /**Ruta para que me redirija de home, diractamente a productos*/
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  //Ruta que responde a todas las rutas que no se tienen en la aplicación, es decir una respuesta 404
  { path: '**', redirectTo: '', pathMatch: 'full'} /**Ruta para que me redirija a la Home Page por defecto*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
