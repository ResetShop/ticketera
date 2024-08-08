import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { appResolver } from './app.resolver';
import { Event } from './interfaces/event.model'

describe('appResolver', () => {
  const executeResolver: ResolveFn<Event> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => appResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
