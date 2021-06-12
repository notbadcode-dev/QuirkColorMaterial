import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';

import { EParentView, EView } from 'src/app/enum/enum.global';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxColorsModule } from 'ngx-colors';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'new',
    component: MaintenanceComponent,
    data: {
      breadcrumb: 'New',
      parentView: EParentView.palette,
      view: EView.newPalette
    }
  }, {
    path: 'view/:id',
    component: MaintenanceComponent,
    data: {
      breadcrumb: 'View',
      parentView: EParentView.palette,
      view: EView.viewPalette
    }
  }, {
    path: 'edit/:id',
    component: MaintenanceComponent,
    data: {
    breadcrumb: 'Edit',
    parentView: EParentView.palette,
    view: EView.editPalette
  }
},
];

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule]
})
export class MaintenanceModule { }
