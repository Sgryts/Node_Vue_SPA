import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IAlbum } from 'ngx-lightbox/lightbox-event.service';
import IPhoto from '../../../../models/photo.model';
import IGenre from '../../../../models/genre.model';
import { MatDialog } from '@angular/material/dialog';
import { PhotosEditDialogComponent } from './dialogs/photos-edit-dialog.component';
import { PhotosDeleteDialogComponent } from './dialogs/photos-delete-dialog.component';

@Component({
  selector: 'admin-photos-gallery',
  templateUrl: './photos-gallery.component.html',
  styleUrls: ['./photos-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosGalleryComponent {
  @Input() photos: Array<IAlbum & Partial<IPhoto>>;
  @Input() genres: Array<IGenre>;
  @Input() galleryForm: Array<IGenre>;
  @Output() selectedImageId = new EventEmitter<number>();

  constructor(public dialog: MatDialog) {

  }

  openSelectedImage(index: number): void {
    this.selectedImageId.emit(index);
  }

  onEdit(photo: IPhoto): void {
    this.dialog.open(PhotosEditDialogComponent, {
      height: '800px',
      width: '800px',
      data: {
        panelClass: 'edit-dialog',
        photo: photo,
        genres: this.genres,
        form: this.galleryForm
      }
    });
  }

  onDelete(id: string): void {
    this.dialog.open(PhotosDeleteDialogComponent, { data: id });
  }
}
