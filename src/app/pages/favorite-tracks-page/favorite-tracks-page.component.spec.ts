import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTracksPageComponent } from './favorite-tracks-page.component';

describe('FavoriteTracksPageComponent', () => {
  let component: FavoriteTracksPageComponent;
  let fixture: ComponentFixture<FavoriteTracksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteTracksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteTracksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
