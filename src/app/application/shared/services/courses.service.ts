import { HttpClient } from '@angular/common/http';
import { CoursesRequest } from './../../shared/models/';
import { Injectable } from '@angular/core';
import { forkJoin, Observable} from 'rxjs';
import { map, switchMap} from 'rxjs/operators'
import { Course } from '../../shared/models';

@Injectable()
export class CoursesService {
  constructor(private http:HttpClient) { }

  public getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/courses');
  }

  public getStudentCourses(studentId: number): Observable<Course[]> {
    return this.http.get<CoursesRequest[]>('/requests',{params:{StudentId:`${studentId}`}}).pipe(
      switchMap(res => {
        let request:CoursesRequest = res[0]
        return forkJoin(request.Courses.map(course => this.getCourse(course.CourseId).pipe(
          map(course => {
            if (!course) { return {} as Course }
            course.paymets = [request.PaymentType]
            return course
          })
        )))
      }));
  }

  private getCourse(courseId: number): Observable<Course> {
    return this.http.get<Course[]>('/courses',{params: {CourseId: `${courseId}`}}).pipe(map(courses => courses[0]));
  }

  public addCourse(course: Course) {
    return this.http.post<Course>('/courses',course);
  }

  public editCourseSeats(courseId: number, availableSeats: number) {
    return this.http.patch<Course>('/courses',{courseId,availableSeats});
  }

}
