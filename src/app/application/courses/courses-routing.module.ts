import { AllCoursesComponent } from './pages';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-courses',
        pathMatch: 'full'
      },
      {
        path: 'all-courses', component: AllCoursesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCoursesRoutingModule { }
