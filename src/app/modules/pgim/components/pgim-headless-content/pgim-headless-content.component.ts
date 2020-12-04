import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { PgimContentFetchService } from '../../../../modules/core/services/pgim-content-fetch.service';
import { UtilsHelperService } from '../../../../modules/core/services/utils-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from 'express';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CookieService } from '@gorniv/ngx-universal';
import { ROUTES_CONFIG } from 'src/app/configs/routes.config';
import { DOCUMENT } from '@angular/common';
import { LayoutConfig_PGIMAbsoluteReturnBondFund } from 'src/app/configs/layout-config';
@Component({
  selector: 'app-pgim-headless-content',
  templateUrl: './pgim-headless-content.component.html',
  styleUrls: ['./pgim-headless-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PgimHeadlessContentComponent implements OnInit {
  public items: any = [];
  public processedContent: any = [];
  public controlConfigRules = LayoutConfig_PGIMAbsoluteReturnBondFund;
  constructor(
    private pgimContentFetchService: PgimContentFetchService,
    private utilsHelperService: UtilsHelperService,
    @Inject(ROUTES_CONFIG) public routesConfig: any
  ) {}

  ngOnInit(): void {
    this.fetchPgimContent();
  }
  fetchPgimContent() {
    this.processedContent = [];
    this.pgimContentFetchService.getPgimContent().subscribe(
      res => {
        console.log('Response received! ->', res);
        this.processPgimContent(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  processPgimContent(content: any = null) {
    if (!content) {
      return;
    }

    const { data } = content;
    if (data && data.constructor === Array && data.length > 0) {
      let pageBase = {
        title: null,
        sourceDictionary: content,
        flatControlList: [],
      };
      // Page is present in response
      this.utilsHelperService.mapSourceToTarget(pageBase).subscribe(
        (mapResult: any) => {
          // console.log('mapResult ->', mapResult);
          const { flatControlList, structureControlList } = mapResult;
          this.processedContent = structureControlList;
          this.items = structureControlList;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  trackByFn(index: any) {
    return index;
  }
}
