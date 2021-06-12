import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list.component'

import { EParentView, EView } from 'src/app/enum/enum.global';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
  {
    path: 'all',
    component: ListComponent,
    data: {
      breadcrumb: 'All',
      parentView: EParentView.list,
      view: EView.allList
    }
  }, {
    path: 'famous',
    component: ListComponent,
    data: {
      breadcrumb: 'Famous',
      parentView: EParentView.list,
      view: EView.famousList
    }
  }, {
    path: 'liked',
    component: ListComponent,
    data: {
      breadcrumb: 'That you liked!',
      parentView: EParentView.list,
      view: EView.likesList
    }
  },
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    InfiniteScrollModule,
    SharedModule,
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListModule { }
