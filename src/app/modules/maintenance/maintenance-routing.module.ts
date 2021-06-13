import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EParentView, EView } from 'src/app/shared/enum/enum.global';
import { MaintenanceComponent } from './maintenance.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list/all',
  }, {
    path: 'new',
    component: MaintenanceComponent,
    data: {
      breadcrumb: 'New',
      parentView: EParentView.palette,
      view: EView.newPalette
    }
  }, {
    path: 'detail/:id',
    component: MaintenanceComponent,
    data: {
      breadcrumb: 'View',
      parentView: EParentView.palette,
      view: EView.detailPalette
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
