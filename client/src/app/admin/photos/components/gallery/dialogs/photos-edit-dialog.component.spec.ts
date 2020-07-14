import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosEditDialogComponent } from './photos-edit-dialog.component';

describe('PhotosEditDialogComponent', () => {
  let component: PhotosEditDialogComponent;
  let fixture: ComponentFixture<PhotosEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
