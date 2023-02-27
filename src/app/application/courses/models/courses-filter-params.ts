import { CourseLevel } from './../../shared/models/course';
import { CourseCategory } from "../../shared/models";

export enum CourseDurationLimit {
  lessThan2Hours = 1,
  from2To10Hours = 2,
  morThan10Hours = 3
}
export class CoursesFilterParams {
  constructor() { }
  searchText?: string;
  courseDurationLimit?: CourseDurationLimit;
  category?: CourseCategory;
  courseLevel?: CourseLevel;
}
