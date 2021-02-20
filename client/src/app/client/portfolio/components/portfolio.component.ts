import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SecurityContext,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { IAlbum } from 'ngx-lightbox/lightbox-event.service';
import IGenre from '../../../models/genre.model';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'client-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnChanges {
  @Input() photos: IAlbum[];
  @Input() genres: IGenre[];
  @Input() isLoading: boolean;
  @Output() selectedGenre = new EventEmitter<string>();

  public data = [];
  public data2 = [];
  page = 0;
  size = 4;

  constructor(private lightbox: Lightbox) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.photos) {
      this.data2 = this.photos;
      this.setPaging({ pageIndex: this.page, pageSize: this.size });
    }
  }


  public setPaging(data: { pageIndex: number; pageSize: number; }): void {
    let index = 0,
      startingIndex = data.pageIndex * data.pageSize,
      endingIndex = startingIndex + data.pageSize;
    this.data = this.data2.filter((): boolean => {
      index++;
      return (index > startingIndex && index <= endingIndex);
    });
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
