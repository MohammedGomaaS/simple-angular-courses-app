import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/application/shared/models';

@Pipe({
  name: 'isCourseAvaiable',
  pure:false
})
export class IsCourseAvaiablePipe implements PipeTransform {

  transform(courseId: number, myCourses: Course[]): boolean {
    return !myCourses.some(myCourse => myCourse.CourseId === courseId)
  }
}
