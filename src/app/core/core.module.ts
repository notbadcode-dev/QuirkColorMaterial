import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalUtilService } from './services/global-util.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpBaseInterceptor } from './interceptors/http-base.interceptor';



@NgModule({
  declarations: [],
  providers: [
    GlobalUtilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpBaseInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  static forRoor(): ModuleWithProviders<NgModule> {
    return {
      ngModule: CoreModule, providers: []
    }
  }
}
