import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGenresPageComponent } from './top-genres-page.component';

describe('TopGenresPageComponent', () => {
  let component: TopGenresPageComponent;
  let fixture: ComponentFixture<TopGenresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopGenresPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopGenresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
