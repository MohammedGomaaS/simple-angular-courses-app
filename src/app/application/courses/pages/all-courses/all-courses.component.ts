import { CoursesService } from './../../../shared/services';
import { CourseCategory, CourseLevel } from './../../../shared/models/course';
import { CourseDurationLimit, CoursesFilterParams } from './../../models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Course } from 'src/app/application/shared/models';
import { ActivatedRoute } from '@angular/router';
import { QueryParamsHelperService } from 'src/app/core/services';
import { map, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public componentList: Course[] = [];
  public myCourses$: Observable<Observable<Course>[]>;
  private courses: Course[] = [];
  private subscriptions: Subscription[] = [];
  private searchSubscription: Subscription;
  private filterParams: CoursesFilterParams = new CoursesFilterParams();
  public courseCategoryEnum = CourseCategory;
  public CourseDurationLimitEnum = CourseDurationLimit;
  public isFiltersWrapperActive: boolean =false;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private queryParamsHelperService: QueryParamsHelperService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.subscribeToUrlParams();
    this.createSearchForm();
    this.setMyCourses();
  }

  private setMyCourses(){
    this.myCourses$ = this.coursesService.getStudentCourses(1234);
  }

  public toggleFilters() {
    this.isFiltersWrapperActive = !this.isFiltersWrapperActive;
    document.getElementById('overlay').classList.remove('d-none');
  };

  public closeFilters() {
    this.isFiltersWrapperActive = false;
    document.getElementById('overlay').classList.add('d-none');
  }

  private createSearchForm() {
    this.searchForm = this.fb.group({
      courseDurationLimit: [Number(this.filterParams.courseDurationLimit)],
      category: [this.filterParams.category]
    });
    this.searchForm.valueChanges.subscribe(re => {
      this.filterParams = re;
      // we depend on filteration change cretira to the route query params so we can refresh and don't lose the filter
      this.queryParamsHelperService.changeUrlParams(this.filterParams)
    })
  }

  /**
   * this function listen to query param subject to filter the items
   */
  private subscribeToUrlParams() {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        Object.assign(this.filterParams, params);
        this.setComponentList();
      })
    );
  }

  private setComponentList() {
    this.searchSubscription?.unsubscribe();
    if (this.courses?.length > 0) {
      this.componentList = this.filterCourses(this.courses);
      return
    }
    this.searchSubscription = this.coursesService.getCourses().pipe(
      tap(courses => { this.courses = courses }),
      map(courses => this.filterCourses(courses)))
      .subscribe(courses => {
        this.componentList = courses;
      })
  }

/**
 * we use this function to apply the filter cretia to the list
 * @param courses
 * @returns
 */
  private filterCourses(courses: Course[]) {
    return courses.filter(course => {
      let existed: boolean = true
      if (this.filterParams.category) {
        existed = existed && course.CourseCategory === this.filterParams.category
      }
      if (this.filterParams.courseDurationLimit) {
        switch (Number(this.filterParams.courseDurationLimit)) {
          case CourseDurationLimit.lessThan2Hours: {
            existed = existed && course.CourseDuration < 2
            break;
          }
          case CourseDurationLimit.from2To10Hours: {
            existed = existed && course.CourseDuration >= 2 && course.CourseDuration <= 10
            break;
          }
          case CourseDurationLimit.morThan10Hours: {
            existed = existed && course.CourseDuration > 10
            break;
          }

        }
      }
      return existed;
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe());
    this.searchSubscription?.unsubscribe();
  }
}
