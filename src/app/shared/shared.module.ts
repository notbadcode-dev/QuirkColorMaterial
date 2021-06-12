import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { GlobalData } from './global.data';
import { GlobalUtil } from './global.util';
import { LikesComponent } from './components/likes/likes.component';
import { NgxColorsModule } from 'ngx-colors';
import { AboutComponent } from './components/about/about.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

const components: any[] = [BreadcrumbComponent, PaginationComponent, LikesComponent, AboutComponent]

const materialModules: any[] = [MatButtonModule, MatIconModule, MatTooltipModule, MatIconModule, MatDialogModule, MatListModule]
const modules: any[] = [materialModules, CommonModule, NgxColorsModule]

const providers: any[] = [GlobalData, GlobalUtil]

@NgModule({
  declarations: [components, AboutComponent],
  imports: [modules],
  exports: [components, modules],
  providers: [providers],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
