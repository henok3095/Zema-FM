import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTracksPageComponent } from './top-tracks-page.component';

describe('TopTracksPageComponent', () => {
  let component: TopTracksPageComponent;
  let fixture: ComponentFixture<TopTracksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTracksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTracksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
