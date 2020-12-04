import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { fadeIn } from 'ng-animate';
import { UtilsHelperService } from 'src/app/modules/core/services/utils-helper.service';

@Component({
  selector: 'app-pgim-grid-control',
  templateUrl: './pgim-grid-control.component.html',
  styleUrls: ['./pgim-grid-control.component.scss'],
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
export class PgimGridControlComponent implements OnInit {

  displayedColumns: string[] = [];
  gridDataSource;
  gridAttribute;

  @Input() item: any;
  @Input() itemConfig: any;

  public ctrlConfig;

  constructor(private utilsHelperService: UtilsHelperService) {}

  ngOnInit(): void {
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
      const { attributes } = this.item;
      if(attributes && attributes.hasOwnProperty('layout_size') && attributes.layout_size){
        const layout_size = this.utilsHelperService.getLayoutClass(attributes);
        if(layout_size){
          this.ctrlConfig.size = layout_size;
        }
      }
      const gContent = this.processGridContent(this.item);
      const { gridSource, gridHeaders } = gContent;
      this.gridDataSource = gridSource ? gridSource : [];
      this.displayedColumns = this.ctrlConfig.hasOwnProperty('columnsConfig')
        ? this.ctrlConfig.columnsConfig
        : gridHeaders
        ? gridHeaders
        : [];
      console.log('Extracted Table Data -> ', this.gridDataSource);
      console.log('Extracted Table Columns -> ', this.displayedColumns);
    }
  }

  processGridContent(content) {
    // paragraph--pgim_fund_menu_component
    const { attributes, children, type } = this.item;
    this.gridAttribute = attributes ? attributes : null;

    const gridDataSource = [];
    const gridHeaders = [];
    if (children) {
      children.forEach((rElement, index) => {
        if (rElement && rElement.hasOwnProperty('children')) {
          const rowChildren = rElement.children;
          const rowContent = rowChildren.reduce((gSource, gcElement, rowIndex) => {
            if (index === 0) {
              gridHeaders.push(gcElement.type);
            }
            return {
              ...gSource,
              [gcElement.type]: gcElement.value,
            };
          }, {});
          gridDataSource.push(rowContent);
        }
      });
    }
    return {
      gridSource: gridDataSource,
      gridHeaders,
    };
  }

}
