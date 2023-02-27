import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
const mockFolder: string = `assets/mock-data`;

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const fakeUrl = `${mockFolder}${request.url}.json`;
    const fakeRequest = request.clone({ url: fakeUrl });
    return next.handle(fakeRequest).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        event = event.clone({ body: this.filterResponse(event.body,request.params) });
      }
      return event;
    }));;
  }

  private filterResponse(values: any, params: HttpParams) {
    let paramsKeys: string[] = params.keys()
    if (paramsKeys.length === 0 || !Array.isArray(values)) {
      return values;
    }
    return values.filter(value => {
      return value[paramsKeys[0]] == params.get(paramsKeys[0]);
    });
  }
}

