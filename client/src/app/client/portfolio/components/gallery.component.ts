import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IAlbum } from 'ngx-lightbox/lightbox-event.service';

@Component({
  selector: 'client-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {
  @Input() photos: IAlbum[];
  @Output() selectedImageId = new EventEmitter<number>();

  openSelectedImage(index: number): void {
    this.selectedImageId.emit(index);
  }
}
