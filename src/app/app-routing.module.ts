import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Route[] = [
  { path: '', redirectTo: 'list/all', pathMatch: 'full' },
  {
    path: 'list',
    loadChildren: () => import('./modules/list/list.module').then(m => m.ListModule),
  }, {
    path: 'maintenance',
    loadChildren: () => import('./modules/maintenance/maintenance.module').then(m => m.MaintenanceModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }, {
    path: '**', redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
