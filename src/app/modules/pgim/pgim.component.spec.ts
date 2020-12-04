import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgimComponent } from './pgim.component';

describe('PgimComponent', () => {
  let component: PgimComponent;
  let fixture: ComponentFixture<PgimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
