import { MockDataInterceptor } from './interceptors';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryParamsHelperService } from './services';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MockDataInterceptor, multi: true },
]

const services = [QueryParamsHelperService]

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [...interceptors,...services]
})
export class CoreModule {
  constructor(){
  }
 }
