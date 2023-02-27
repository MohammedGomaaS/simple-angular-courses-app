import { ShellModule } from './shell/shell.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';

@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ShellModule
  ],
  exports: [ShellModule]
})
export class ApplicationModule { }
