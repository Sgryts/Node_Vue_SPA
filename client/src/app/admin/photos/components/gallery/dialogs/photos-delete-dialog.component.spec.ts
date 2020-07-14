import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosDeleteDialogComponent } from './photos-delete-dialog.component';

describe('PhotosDeleteDialogComponent', () => {
  let component: PhotosDeleteDialogComponent;
  let fixture: ComponentFixture<PhotosDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
