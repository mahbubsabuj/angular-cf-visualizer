import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdictComponent } from './verdict.component';

describe('VerdictComponent', () => {
  let component: VerdictComponent;
  let fixture: ComponentFixture<VerdictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerdictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
