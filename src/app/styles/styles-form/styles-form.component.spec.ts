import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesFormComponent } from './styles-form.component';

describe('StylesFormComponent', () => {
  let component: StylesFormComponent;
  let fixture: ComponentFixture<StylesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
