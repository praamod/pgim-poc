import { AfterViewInit, Component, HostListener, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { PgimContentFetchService } from '../../modules/core/services/pgim-content-fetch.service';
import { UtilsHelperService } from '../../modules/core/services/utils-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from 'express';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CookieService } from '@gorniv/ngx-universal';
import { ROUTES_CONFIG } from 'src/app/configs/routes.config';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pgim',
  templateUrl: './pgim.component.html',
  styleUrls: [
    './pgim.component.scss',
    // 'https://www.pgim.com/pcom6/www_pcomretails_com/common/css/globalpgim-main.min.css',
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 1, delay: 0 },
        })
      ),
    ]),
  ],
})
export class PgimComponent implements OnInit, AfterViewInit {
  public items: any = [];
  public processedContent: any = [];
  constructor(
    private pgimContentFetchService: PgimContentFetchService,
    private utilsHelperService: UtilsHelperService,
    @Inject(ROUTES_CONFIG) public routesConfig: any,
    @Inject(DOCUMENT) document
  ) {}

  ngOnInit() {
    // this.fetchPgimContent();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 80) {
       let element = document.getElementById('header');
       element.classList.remove('main_navigation--transparent');
       element.classList.add('main_navigation--light');
       element.classList.add('main_navigation--fixed');
     } else {
      let element = document.getElementById('header');
        element.classList.remove('main_navigation--light');
        element.classList.remove('main_navigation--fixed');
        element.classList.add('main_navigation--transparent');
     }
  }

  ngAfterViewInit() {}


}
