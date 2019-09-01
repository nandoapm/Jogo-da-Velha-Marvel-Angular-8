import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MarvelService } from './marvel.service';

describe('MarvelService', () => {
  beforeEach(() => TestBed.configureTestingModule({ 
    providers: [ HttpClient, HttpHandler ]
  }));

  it('should be created', () => {
    const service: MarvelService = TestBed.get(MarvelService);
    expect(service).toBeTruthy();
  });
});
