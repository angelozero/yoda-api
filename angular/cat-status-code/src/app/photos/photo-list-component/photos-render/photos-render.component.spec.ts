import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosRenderComponent } from './photos-render.component';

describe('PhotosRenderComponent', () => {
  let component: PhotosRenderComponent;
  let fixture: ComponentFixture<PhotosRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
