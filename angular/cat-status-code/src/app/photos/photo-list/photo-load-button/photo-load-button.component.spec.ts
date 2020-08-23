import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoLoadButtonComponent } from './photo-load-button.component';

describe('PhotoLoadButtonComponent', () => {
  let component: PhotoLoadButtonComponent;
  let fixture: ComponentFixture<PhotoLoadButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoLoadButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoLoadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
