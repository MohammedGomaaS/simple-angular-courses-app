import { HttpClient } from '@angular/common/http';
import { CoursesRequest } from './../../shared/models/';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators'
import { Course } from '../../shared/models';

@Injectable()
export class CoursesService {
  constructor(private http:HttpClient) { }

  public getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/courses');
  }

  public getStudentCourses(studentId: number): Observable<Observable<Course>[]> {
    return this.http.get<CoursesRequest[]>('/requests',{params:{StudentId:`${studentId}`}}).pipe(
      map(res => {
        let request:CoursesRequest = res[0]
        return request.Courses.map(course => this.getCourse(course.CourseId).pipe(
          map(course => {
            if (!course) { return {} as Course }
            course.paymets = [request.PaymentType]
            return course
          })
        ))
      }));
  }

  private getCourse(courseId: number): Observable<Course> {
    return this.http.get<Course[]>('/courses',{params: {CourseId: `${courseId}`}}).pipe(map(courses => courses[0]));
  }

  private addCourse(course: Course) {

  }

  private editCourseSeats(courseId: number, availableSeats: number) {

  }

}
