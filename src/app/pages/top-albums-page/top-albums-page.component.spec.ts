import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAlbumsPageComponent } from './top-albums-page.component';

describe('TopAlbumsPageComponent', () => {
  let component: TopAlbumsPageComponent;
  let fixture: ComponentFixture<TopAlbumsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopAlbumsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAlbumsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
