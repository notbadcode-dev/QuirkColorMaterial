import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { EParentView, EView } from './enum/enum.global';

const routes: Route[] = [
  { path: '', redirectTo: 'list/all', pathMatch: 'full' },
  { path: 'list', redirectTo: 'list/all', pathMatch: 'full'},
  { path: 'list/all', component: ListComponent, data: { breadcrumb: 'All', parentView: EParentView.list, view: EView.allList }},
  { path: 'list/famous', component: ListComponent, data: { breadcrumb: 'Famous', parentView: EParentView.list, view: EView.famousList }},
  { path: 'list/liked', component: ListComponent, data: { breadcrumb: 'That you liked!', parentView: EParentView.list, view: EView.likesList }},
  { path: 'maintenance', redirectTo: 'list/all', pathMatch: 'full' },
  { path: 'maintenance/new', component: MaintenanceComponent, data: { breadcrumb: 'New', parentView: EParentView.palette, view: EView.newPalette }},
  { path: 'maintenance/view/:id', component: MaintenanceComponent, data: { breadcrumb: 'View', parentView: EParentView.palette, view: EView.viewPalette }},
  { path: 'maintenance/edit/:id', component: MaintenanceComponent, data: { breadcrumb: 'Edit', parentView: EParentView.palette, view: EView.editPalette }},
  { path: '**', redirectTo: 'list/all' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
