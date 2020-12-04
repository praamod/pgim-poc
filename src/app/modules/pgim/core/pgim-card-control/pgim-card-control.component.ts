import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UtilsHelperService } from 'src/app/modules/core/services/utils-helper.service';

@Component({
  selector: 'app-pgim-card-control',
  templateUrl: './pgim-card-control.component.html',
  styleUrls: ['./pgim-card-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PgimCardControlComponent implements OnInit {
  @Input() item: any;
  @Input() itemConfig: any;

  public ctrlAttribute;
  public ctrlConfig;
  public items: any;
  constructor(private utilsHelperService: UtilsHelperService) {}

  ngOnInit(): void {
    // console.log('Card -> ', this.item);
    if (this.item) {
      const { attributes, children, type } = this.item;
    this.ctrlAttribute = attributes ? attributes : null;
      if (this.item.hasOwnProperty('children')) {
        this.items = this.item.children;
      }
      if (this.itemConfig) {
        this.ctrlConfig = this.utilsHelperService.fetchLayoutConfig(
          this.itemConfig,
          'id',
          this.item?.id
        );
        console.log('Control Config -> ', this.ctrlConfig);
      }

      if(attributes && attributes.hasOwnProperty('layout_size') && attributes.layout_size){
        const layout_size = this.utilsHelperService.getLayoutClass(attributes);
        if(layout_size){
          this.ctrlConfig.size = layout_size;
        }
      }
    }
  }
}
