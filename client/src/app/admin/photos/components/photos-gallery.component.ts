import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IAlbum } from 'ngx-lightbox/lightbox-event.service';
import IPhoto from '../../../models/photo.model';

@Component({
  selector: 'admin-photos-gallery',
  templateUrl: './photos-gallery.component.html',
  // styleUrls: ['./photos-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosGalleryComponent {
  @Input() photos: Array<IAlbum & Partial<IPhoto>>;
  @Output() selectedImageId = new EventEmitter<number>();

  openSelectedImage(index: number): void {
    this.selectedImageId.emit(index);
  }
}
