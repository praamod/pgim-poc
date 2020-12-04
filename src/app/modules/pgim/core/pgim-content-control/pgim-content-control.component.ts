import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UtilsHelperService } from 'src/app/modules/core/services/utils-helper.service';

@Component({
  selector: 'app-pgim-content-control',
  templateUrl: './pgim-content-control.component.html',
  styleUrls: ['./pgim-content-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PgimContentControlComponent implements OnInit {
  @Input() item: any;
  @Input() itemConfig: any;

  public ctrlConfig;

  constructor(private utilsHelperService: UtilsHelperService) {}

  ngOnInit(): void {
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
          this.ctrlConfig.size = this.ctrlConfig && this.ctrlConfig.cssClass? `${layout_size} ${this.ctrlConfig.cssClass}`:layout_size ;
        }
      }else{
        this.ctrlConfig = {
          ...this.ctrlConfig,
          size: this.ctrlConfig && this.ctrlConfig.cssClass? `${this.ctrlConfig.cssClass}`: ''
        }
      }
    }
  }
}
