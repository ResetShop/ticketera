import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { appResolver } from './app.resolver';
import { Event } from './interfaces/event.model'
import { EventService } from './providers/event.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('appResolver', () => {
  const executeResolver: ResolveFn<Event> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => appResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
