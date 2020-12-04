import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { PgimListControlComponent } from '../pgim/components/pgim-list-control/pgim-list-control.component';
import { PgimCardControlComponent } from '../pgim/core/pgim-card-control/pgim-card-control.component';
import { PgimContainerControlComponent } from '../pgim/core/pgim-container-control/pgim-container-control.component';
import { PgimContentControlComponent } from '../pgim/core/pgim-content-control/pgim-content-control.component';
import { PgimTableControlComponent } from '../pgim/core/pgim-table-control/pgim-table-control.component';
import { DynamicItemDirective } from './directives/dynamic-item.directive';
import { PgimGridControlComponent } from '../pgim/core/pgim-grid-control/pgim-grid-control.component';

export const DYNAMIC_COMPONENTS: Array<any> = [
  PgimCardControlComponent,
  PgimContainerControlComponent,
  PgimContentControlComponent,
  PgimListControlComponent,
  PgimTableControlComponent,
  PgimGridControlComponent,
];

@NgModule({
  declarations: [DynamicItemDirective, ...DYNAMIC_COMPONENTS],
  imports: [CommonModule, SharedModule],
  providers: [],
  entryComponents: DYNAMIC_COMPONENTS,
  exports: [DynamicItemDirective, ...DYNAMIC_COMPONENTS],
})
export class FeatureModule {}
