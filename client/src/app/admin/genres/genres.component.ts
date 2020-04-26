import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import IGenre from '../../models/genre.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresComponent implements OnInit {
  @Input() genres: IGenre[];
  @Output() genreAdded: EventEmitter<string> = new EventEmitter<string>();
  @Output() genreUpdated: EventEmitter<IGenre> = new EventEmitter<IGenre>();
  @Output() genreDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }
  // TODO:
  // on update/delete -> store genre meta in variable, then pass to modal
  // or reactive forms?
  // after success -> flush data.

  public addGenre(genreName: string): void {
    this.genreAdded.emit(genreName);
  }

  public updateGenre(genre: IGenre): void {
    this.genreUpdated.emit(genre);
  }

  public deleteGenre(id: string): void {
    this.genreDeleted.emit(id);
  }
}
