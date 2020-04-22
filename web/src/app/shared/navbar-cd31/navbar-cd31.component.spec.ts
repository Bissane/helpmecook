import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCD31Component } from './navbar-cd31.component';

describe('NavbarCD31Component', () => {
  let component: NavbarCD31Component;
  let fixture: ComponentFixture<NavbarCD31Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarCD31Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCD31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
