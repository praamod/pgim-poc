import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeatureModule } from '../feature/feature.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageDetailComponent } from './components/page-detail/page-detail.component';
import { PgimMainNavigationComponent } from './components/pgim-main-navigation/pgim-main-navigation.component';
import { PgimRoutingModule } from './pgim-routing.module';
import { PgimComponent } from './pgim.component';
import { PgimHeadlessContentComponent } from './components/pgim-headless-content/pgim-headless-content.component';
import { PgimFundProfileHeaderComponent } from './components/pgim-fund-profile-header/pgim-fund-profile-header.component';


@NgModule({
  declarations: [PgimComponent, HeaderComponent, FooterComponent, PgimMainNavigationComponent, PageDetailComponent, PgimHeadlessContentComponent, PgimFundProfileHeaderComponent],
  imports: [CommonModule, FeatureModule, PgimRoutingModule],
  exports: [HeaderComponent, FooterComponent],
})
export class PgimModule {}
