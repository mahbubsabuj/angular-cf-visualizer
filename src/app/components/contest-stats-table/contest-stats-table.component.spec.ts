import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestStatsTableComponent } from './contest-stats-table.component';

describe('ContestStatsTableComponent', () => {
  let component: ContestStatsTableComponent;
  let fixture: ComponentFixture<ContestStatsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestStatsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestStatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
