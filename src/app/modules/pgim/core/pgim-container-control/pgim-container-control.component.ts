import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { fadeIn } from 'ng-animate';
import { UtilsHelperService } from 'src/app/modules/core/services/utils-helper.service';

@Component({
  selector: 'app-pgim-container-control',
  templateUrl: './pgim-container-control.component.html',
  styleUrls: ['./pgim-container-control.component.scss'],
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
export class PgimContainerControlComponent implements OnInit {
  @Input() item: any;
  @Input() itemConfig: any;

  public ctrlConfig;
  public items: any;
  constructor(private utilsHelperService: UtilsHelperService) {}

  ngOnInit(): void {
    // console.log('Container -> ', this.item);
    if (this.item) {
      if (this.item.hasOwnProperty('children')) {
        this.items = this.item.children;
      }
      if (this.itemConfig) {
        this.ctrlConfig = this.utilsHelperService.fetchLayoutConfig(
          this.itemConfig,
          'id',
          this.item?.id
        );
      }

      const { attributes } = this.item;
      if(attributes && attributes.hasOwnProperty('layout_size') && attributes.layout_size){
        const layout_size = this.utilsHelperService.getLayoutClass(attributes);
        if(layout_size){
          this.ctrlConfig.size = layout_size;
        }
      }
    }
  }
}
