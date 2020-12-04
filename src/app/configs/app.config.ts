import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  votesLimit: 3,
  topHeroesLimit: 5,
  snackBarDuration: 3000,
  drupalEndpoint:
    'http://www.nuuuse.net/pgim_api/pgim_fund_service?filter%5burl-filter%5d%5bcondition%5d%5bpath%5d=url&filter%5burl-filter%5d%5bcondition%5d%5boperator%5d=%3D&filter%5burl-filter%5d%5bcondition%5d%5bvalue%5d=test-fund-page&fields%5bpgim_fund_page%5d=title,url,sections,layout_size&include=sections.components,sections.components.fund_tuples,sections.components.fund_table_rows,sections.components.fund_table_row_headers,sections.components.components,sections.components.components.fund_tuples,sections.components.components.fund_table_rows,sections.components.components.fund_table_row_headers',
  repositoryURL: 'https://github.com/ismaestro/angular8-example-app',
  sentryDSN: 'https://38434a1b115f41d3a31e356cdc496c06@sentry.io/1315526',
  cspDirectives: {
    defaultSrc: [
      "'self'",
      'data:',
      'http://*.google-analytics.com',
      'http://www.googletagmanager.com',
      'https://*.google.com',
      'https://*.google-analytics.com',
      'https://*.googletagmanager.com',
      'https://*.gstatic.com',
      'https://*.googleapis.com',
      'https://authedmine.com',
      'https://az743702.vo.msecnd.net',
      'https://sentry.io',
      'ws://localhost:4200',
    ],
    frameAncestors: ["'self'"],
    upgradeInsecureRequests: true,
    styleSrc: ["'self'", "'unsafe-inline'", 'https://*.googleapis.com'],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      'http://*.googletagmanager.com',
      'https://*.google-analytics.com',
    ],
  },
};
