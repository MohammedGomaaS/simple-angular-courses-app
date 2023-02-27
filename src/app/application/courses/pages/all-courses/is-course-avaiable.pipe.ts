import { forkJoin, Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/application/shared/models';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'isCourseAvaiable',
  pure:true
})
export class IsCourseAvaiablePipe implements PipeTransform {

  transform(courseId: number, myCourses$: Observable<Course>[]): Observable<boolean> {
    return forkJoin(myCourses$).pipe(map(myCourses => !myCourses.some(myCourse => myCourse.CourseId === courseId)))
  }
}
