import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyPlayedPageComponent } from './recently-played-page.component';

describe('RecentlyPlayedPageComponent', () => {
  let component: RecentlyPlayedPageComponent;
  let fixture: ComponentFixture<RecentlyPlayedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentlyPlayedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyPlayedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
