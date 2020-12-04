import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { fadeIn } from 'ng-animate';
import { take } from 'rxjs/operators';
import { PgimContentFetchService } from '../../../../modules/core/services/pgim-content-fetch.service';
import { UtilsHelperService } from '../../../../modules/core/services/utils-helper.service';

@Component({
  selector: 'app-pgim-table-control',
  templateUrl: './pgim-table-control.component.html',
  styleUrls: ['./pgim-table-control.component.scss'],
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
export class PgimTableControlComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource;
  tblAttribute;

  @Input() item: any;
  @Input() itemConfig: any;

  public ctrlConfig;

  constructor(
    private utilsHelperService: UtilsHelperService,
    private pgimContentFetchService: PgimContentFetchService
  ) {}

  async ngOnInit() {
    console.log('Table ->', this.item);

    if (this.item) {
      if (this.itemConfig) {
        this.ctrlConfig = this.utilsHelperService.fetchLayoutConfig(
          this.itemConfig,
          'id',
          this.item?.id
        );
        // console.log('Content -> ', this.item);
      }
      const { attributes, column_config } = this.item;
      if (attributes && attributes.hasOwnProperty('layout_size') && attributes.layout_size) {
        const layout_size = this.utilsHelperService.getLayoutClass(attributes);
        if (layout_size) {
          this.ctrlConfig.size = layout_size;
        }
      }
      const tContent = await this.processTableContent(this.item);
      const { tSource, tHeaders } = tContent;
      this.dataSource = tSource ? tSource : [];
      if (attributes) {
        const { column_config } = attributes;
        if (column_config) {
          const column_config_text = column_config.replace(/ /g, "").replace(/\\/g, '');
          const columns = column_config_text.split(',');
          console.log('Before ', columns);
          // columns.asort();
          console.log('After ', columns);
          this.displayedColumns = columns.length > 0 ? columns : [];
        }
      } else {
        this.displayedColumns = this.ctrlConfig.hasOwnProperty('columnsConfig')
          ? this.ctrlConfig.columnsConfig
          : tHeaders
          ? tHeaders
          : [];
      }
      console.log('Extracted Table Data -> ', this.dataSource);
      console.log('Extracted Table Columns -> ', this.displayedColumns);
    }
  }

  async processTableContent(content) {
    // paragraph--pgim_fund_table_component"
    // paragraph--pgim_fund_menu_component
    const { attributes, children, type } = this.item;
    this.tblAttribute = attributes ? attributes : null;

    let tblDataSource = [];
    let tHeaders = [];
    if (
      attributes &&
      attributes.hasOwnProperty('fund_source_endpoint') &&
      attributes.fund_source_endpoint
    ) {
      const res: any = await this.pgimContentFetchService
        .getPgimContent(attributes.fund_source_endpoint)
        .pipe(take(1))
        .toPromise();
      if (res && res.constructor === Array) {
        if (res.length > 0) {
          const rElement = res[0];
          if (rElement && typeof rElement === 'object') {
            tHeaders = Object.keys(rElement);
          }
          tblDataSource = res;
        }
      }
      return {
        tSource: tblDataSource,
        tHeaders,
      };

      // subscribe(
      // (res: any) => {
      //   console.log('Response received! ->', res);
      //
      // },
      // error => {
      //   console.log(error);
      // }
      // );
    } else {
      if (children) {
        children.forEach((rElement, index) => {
          if (rElement && rElement.hasOwnProperty('children')) {
            const rowChildren = rElement.children;
            let cells = {};
            const rowContent = rowChildren.reduce((tSource, cElement, rowIndex) => {
              if (index === 0) {
                tHeaders.push(cElement.type);
              }
              return {
                ...tSource,
                [cElement.type]: cElement.value,
              };
            }, {});
            tblDataSource.push(rowContent);
          }
        });
        return {
          tSource: tblDataSource,
          tHeaders,
        };
      }
    }
  }
}
