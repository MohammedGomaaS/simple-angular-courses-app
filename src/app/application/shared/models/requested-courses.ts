export enum PaymentType {
  Cash = 'Cash',
  Online = 'online'
}
export interface CoursesRequest {
  StudentId: number,
  RequestDate: string,
  TeacherID: string,
  Courses: {
    CourseId: number,
    Members: number
  }[],
  PaymentType: PaymentType
}
