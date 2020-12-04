import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

import { PgimListControlComponent } from '../../pgim/components/pgim-list-control/pgim-list-control.component';
import { PgimCardControlComponent } from '../../pgim/core/pgim-card-control/pgim-card-control.component';
import { PgimContainerControlComponent } from '../../pgim/core/pgim-container-control/pgim-container-control.component';
import { PgimContentControlComponent } from '../../pgim/core/pgim-content-control/pgim-content-control.component';
import { PgimGridControlComponent } from '../../pgim/core/pgim-grid-control/pgim-grid-control.component';
import { PgimTableControlComponent } from '../../pgim/core/pgim-table-control/pgim-table-control.component';

const cpmnntMapper = {
  container: PgimContainerControlComponent,
  card: PgimCardControlComponent,
  section: PgimCardControlComponent,
  list: PgimListControlComponent,
  content: PgimContentControlComponent,
  table: PgimTableControlComponent,
  grid: PgimGridControlComponent,
  'h1': PgimContentControlComponent,
  'h2': PgimContentControlComponent,
  'h3': PgimContentControlComponent,
  'h4': PgimContentControlComponent,
  'h5': PgimContentControlComponent,
  'h6': PgimContentControlComponent,
  'div': PgimContentControlComponent,
  'p': PgimContentControlComponent,
};

@Directive({
  selector: '[appDynamicItem]',
})
export class DynamicItemDirective implements OnInit {
  @Input() item: any;
  @Input() itemConfig: any;
  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    protected _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    // this._viewContainerRef.clear();

    const factory = this.resolver.resolveComponentFactory(cpmnntMapper[this.item.component]);
    this.componentRef = this._viewContainerRef.createComponent(factory);
    this.componentRef.instance.item = this.item;
    this.componentRef.instance.itemConfig = this.itemConfig;
  }
}
