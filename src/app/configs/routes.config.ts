import { InjectionToken } from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const basePaths = {
  heroes: 'heroes',
  pgim: 'pgim'
};

const routesNames = {
  home: '',
  error404: '404',
  heroes: {
    basePath: basePaths.heroes
  },
  pgim: {
    basePath: basePaths.pgim
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    error404: `/${routesNames.error404}`,
    pgim: `/${routesNames.pgim.basePath}`,
    heroes: {
      detail: getHeroDetail
    }
  }
};

export function getHeroDetail(id) {
  return `/${basePaths.heroes}/${id}`;
}
