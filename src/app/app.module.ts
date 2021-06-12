import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { ListModule } from './components/list/list.module';
import { MaintenanceModule } from './components/maintenance/maintenance.module';

import { ToastrModule } from 'ngx-toastr';

import { HttpService } from './services/http/http.service';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxColorsModule } from 'ngx-colors';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),
    NgxColorsModule,
    InfiniteScrollModule,
    ListModule,
    MaintenanceModule,
    SharedModule,
  ],
  exports: [],
  providers: [HttpService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }