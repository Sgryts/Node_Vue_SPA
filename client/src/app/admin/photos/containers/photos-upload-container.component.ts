import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { Observable } from 'rxjs';
import IGenre from '../../../models/genre.model';
import { AdminStateFacade } from '../../state/state.facade';
import { IPhotoUpload } from '../photo-upload.model';

@Component({
  selector: 'admin-photos-upload-container',
  templateUrl: './photos-upload-container.component.html'
})
export class PhotosUploadContainerComponent implements OnInit {
  public genres$: Observable<IGenre[]>;
  public completed$: Observable<boolean>;
  public progress$: Observable<number>;
  public error$: Observable<string>;
  public isInProgress$: Observable<boolean>;
  public isReady$: Observable<boolean>;
  public hasFailed$: Observable<boolean>;

  constructor(private adminFacade: AdminStateFacade) {
  }

  ngOnInit(): void {
    this.adminFacade.loadGenres();
    this.completed$ = this.adminFacade.getPhotoUploadCompleted$;
    this.progress$ = this.adminFacade.getPhotoUploadProgress$;
    this.error$ = this.adminFacade.getPhotosError$;
    this.isInProgress$ = this.adminFacade.getPhotoUploadInProgress$;
    this.isReady$ = this.adminFacade.getPhotoUploadReady$;
    this.hasFailed$ = this.adminFacade.getPhotoUploadError$;
    this.genres$ = this.adminFacade.getGenres$;
  }

  handlePhotoUploaded(upload: IPhotoUpload): void {
    this.adminFacade.uploadPhoto$(upload);
  }

  handlePhotoUploadReset(): void {
    this.adminFacade.resetPhotoUpload();
  }

  handlePhotoUploadCanceled(): void {
    this.adminFacade.cancelPhotoUpload();
  }

  private toFormData<IPhotoUpload>(formValue: IPhotoUpload): FormData {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      let value = formValue[key];
      if (key === 'genres') {
        value = formValue['genres'].map((v) => v._id);
      }
      formData.append(key, value);
    }
    return formData;
  }
}
