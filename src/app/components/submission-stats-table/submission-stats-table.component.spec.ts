import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionStatsTableComponent } from './submission-stats-table.component';

describe('SubmissionStatsTableComponent', () => {
  let component: SubmissionStatsTableComponent;
  let fixture: ComponentFixture<SubmissionStatsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionStatsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionStatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
