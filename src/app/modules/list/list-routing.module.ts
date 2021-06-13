import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EParentView, EView } from 'src/app/shared/enum/enum.global';
import { ListComponent } from './list.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'all'
  }, {
    path: 'all',
    component: ListComponent,
    data: {
      breadcrumb: 'All',
      parentView: EParentView.list,
      view: EView.allList,
    },
  }, {
    path: 'famous',
    component: ListComponent,
    data: {
      breadcrumb: 'Famous',
      parentView: EParentView.list,
      view: EView.famousList,
    },
  }, {
    path: 'liked',
    component: ListComponent,
    data: {
      breadcrumb: 'That you liked!',
      parentView: EParentView.list,
      view: EView.likesList,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
