import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDetailPageComponent } from './pages/hero-detail-page/hero-detail-page.component';
import { HeroesListPageComponent } from './pages/heroes-list-page/heroes-list-page.component';

const heroesRoutes: Routes = [
  { path: '', component: HeroesListPageComponent },
  {
    path: ':id',
    component: HeroDetailPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class HeroRoutingModule {
}
