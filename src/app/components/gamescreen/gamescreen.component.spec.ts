import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamescreenComponent } from './gamescreen.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GamescreenComponent', () => {
  let component: GamescreenComponent;
  let fixture: ComponentFixture<GamescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamescreenComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
