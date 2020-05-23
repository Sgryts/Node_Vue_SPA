import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SecurityContext
} from '@angular/core';
import { IAlbum } from 'ngx-lightbox/lightbox-event.service';
import IGenre from '../../../models/genre.model';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'client-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
  @Input() photos: IAlbum[];
  @Input() genres: IGenre[];
  @Input() isLoading: boolean;
  @Output() selectedGenre = new EventEmitter<string>();

  constructor(private lightbox: Lightbox) {
  }

  onGenreSelected(id: string) {
    this.selectedGenre.emit(id);
  }

  openSelectedImage(index$: number): void {
    this.lightbox.open(this.photos, index$,
      { wrapAround: true, showImageNumberLabel: true });
  }

  close(): void {
    this.lightbox.close();
  }
}
