import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCd31Component } from './footer-cd31.component';

describe('FooterCd31Component', () => {
  let component: FooterCd31Component;
  let fixture: ComponentFixture<FooterCd31Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterCd31Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCd31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
