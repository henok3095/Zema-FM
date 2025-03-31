import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyPlayedComponent } from './recently-played.component';

describe('RecentlyPlayedComponent', () => {
  let component: RecentlyPlayedComponent;
  let fixture: ComponentFixture<RecentlyPlayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentlyPlayedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
