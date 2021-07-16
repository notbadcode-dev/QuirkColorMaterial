import { TestBed } from '@angular/core/testing';

import { HttpBaseInterceptor } from './http-base.interceptor';

describe('HttpBaseInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpBaseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpBaseInterceptor = TestBed.inject(HttpBaseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
