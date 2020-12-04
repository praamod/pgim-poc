import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UtilsHelperService } from 'src/app/modules/core/services/utils-helper.service';

@Component({
  selector: 'app-pgim-list-control',
  templateUrl: './pgim-list-control.component.html',
  styleUrls: ['./pgim-list-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PgimListControlComponent implements OnInit {
  @Input() item: any;
  @Input() itemConfig: any;

  public ctrlConfig;
  public items: any = [];
  constructor(private utilsHelperService: UtilsHelperService) {}

  ngOnInit(): void {
    // console.log('List ->', this.item);
    if (this.item) {
      if (this.item.hasOwnProperty('children')) {
        this.items = this.item.children;
        this.itemConfig = this.item.itemConfig;
      }
      if (this.itemConfig) {
        this.ctrlConfig = this.utilsHelperService.fetchLayoutConfig(this.itemConfig, 'id', this.item?.id);
        // console.log('Content -> ', this.item);
      }
    }
  }
}
