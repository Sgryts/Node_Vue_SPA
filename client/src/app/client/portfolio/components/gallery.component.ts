import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { invoke } from 'lodash'
import { IAlbum } from 'ngx-lightbox/lightbox-event.service';
import IPhoto from '../../../models/photo.model';

@Component({
  selector: 'client-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  @Input() photos: IAlbum[];
  @Output() selectedImageId = new EventEmitter<number>();

  openSelectedImage(index: number): void {
    this.selectedImageId.emit(index);
  }
}
