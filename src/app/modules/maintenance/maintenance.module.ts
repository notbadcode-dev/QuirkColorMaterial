import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaintenanceComponent } from './maintenance.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from 'src/app/shared/shared.module';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { NgxColorsModule } from 'ngx-colors';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    NgxColorsModule,
    MaintenanceRoutingModule,
    SharedModule,
  ],
})
export class MaintenanceModule { }
