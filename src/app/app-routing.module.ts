import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RoutesConfig } from './configs/routes.config';

const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  { path: routesNames.home, component: HomePageComponent, pathMatch: 'full' },
  { path: routesNames.pgim.basePath, loadChildren: () => import('./modules/pgim/pgim.module').then(m => m.PgimModule) },
  { path: routesNames.error404, component: Error404PageComponent },

  // { path: 'en', redirectTo: '' }, // because english language is the default one

  // otherwise redirect to 404
  { path: '**', redirectTo: RoutesConfig.routes.pgim }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
