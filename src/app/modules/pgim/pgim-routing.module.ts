import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgimComponent } from './pgim.component';


const routes: Routes = [
  { path: '', component: PgimComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgimRoutingModule { }
