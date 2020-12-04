import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxExampleLibraryModule } from '@ismaestro/ngx-example-library';
import { NgxScrollToFirstInvalidModule } from '@ismaestro/ngx-scroll-to-first-invalid';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroLoadingComponent } from './components/hero-loading/hero-loading.component';
import { LoadingPlaceholderComponent } from './components/loading-placeholder/loading-placeholder.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from './modules/material.module';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    NgxExampleLibraryModule,
    NgxScrollToFirstInvalidModule,
    LazyLoadImageModule
  ],
  declarations: [
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    LoadingPlaceholderComponent,
    CapitalizeFirstPipe,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxExampleLibraryModule,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    NgxScrollToFirstInvalidModule,
    LoadingPlaceholderComponent,
    CapitalizeFirstPipe,
    LazyLoadImageModule
  ]
})

export class SharedModule {
}
