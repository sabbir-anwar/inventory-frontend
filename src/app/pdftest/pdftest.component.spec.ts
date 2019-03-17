import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdftestComponent } from './pdftest.component';

describe('PdftestComponent', () => {
  let component: PdftestComponent;
  let fixture: ComponentFixture<PdftestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdftestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdftestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
