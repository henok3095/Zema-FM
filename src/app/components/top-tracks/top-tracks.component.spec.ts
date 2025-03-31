import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTracksComponent } from './top-tracks.component';

describe('TopTracksComponent', () => {
  let component: TopTracksComponent;
  let fixture: ComponentFixture<TopTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
