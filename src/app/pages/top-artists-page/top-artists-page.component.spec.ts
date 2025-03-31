import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopArtistsPageComponent } from './top-artists-page.component';

describe('TopArtistsPageComponent', () => {
  let component: TopArtistsPageComponent;
  let fixture: ComponentFixture<TopArtistsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopArtistsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopArtistsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
