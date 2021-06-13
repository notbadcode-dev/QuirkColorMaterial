import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ListComponent } from './list.component'

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from 'src/app/shared/shared.module';

import { ListRoutingModule } from './list-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    InfiniteScrollModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListModule { }
