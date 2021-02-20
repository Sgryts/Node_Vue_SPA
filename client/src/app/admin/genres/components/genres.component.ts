import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges, SimpleChanges
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import IGenre from '../../../models/genre.model';

@Component({
  selector: 'admin-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresComponent implements OnInit, OnChanges {
  @Input() genres: IGenre[];
  @Output() genreAdded: EventEmitter<string> = new EventEmitter<string>();
  @Output() genreUpdated: EventEmitter<IGenre> = new EventEmitter<IGenre>();
  @Output() genreDeleted: EventEmitter<string> = new EventEmitter<string>();

  public genresForm: FormGroup;
  public isUpdateInProgress: boolean;

  get getNewGenre(): AbstractControl {
    return this.genresForm.get('newGenre');
  }

  get getGenresFormArray(): FormArray {
    return this.genresForm.get('genresArray') as FormArray;
  }

  public getGenreFromFormArray(i: number) {
    return ((<FormArray>this.genresForm.get('genresArray')).controls[i]) as FormGroup;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.genres) {
      // this.setFormArrayData(changes.genres.currentValue)
      this.setForm();
    }
  }

  ngOnInit(): void {
    // this.setForm();
  }

  private setForm(): void {
    this.genresForm = this.fb.group({
      newGenre: [{ value: '', disabled: false },
        [Validators.required,
          Validators.min(2),
          Validators.max(50),
          Validators.pattern(/^[A-Za-z]*$/)]],
      genresArray: this.fb.array([])
    });
    this.setFormArrayData(this.genres);
  }

  private setFormArrayData(genres: IGenre[]): void {
    genres.map((g: IGenre): void => this.getGenresFormArray.push(this.buildGenresFormArray(g)));
  }

  private buildGenresFormArray(genre: IGenre): FormGroup {
    return this.fb.group({
      genreId: [{ value: genre._id, disabled: true }],
      genreName: [{
        value: genre.name,
        disabled: true
      },
        [Validators.required,
          Validators.min(2),
          Validators.max(50),
          Validators.pattern(/^[A-Za-z]*$/)]
      ]
    });
  }

  public addGenre(): void {
    this.genreAdded.emit(this.getNewGenre.value);
  }

  public updateGenre(genre: FormGroup): void {
    genre.enable();
    this.isUpdateInProgress = true;
  }

  public confirmUpdate(genre: FormGroup) {
    const genreId = genre.controls.genreId.value;
    const genreName = genre.controls.genreName.value;
    genre.disable();
    this.isUpdateInProgress = false;
    this.genreUpdated.emit({ _id: genreId, name: genreName });
  }

  public cancelUpdate(genre: FormGroup) {
    this.genresForm.reset();
    this.setForm();
    genre.disable();
    this.isUpdateInProgress = false;
  }

  public deleteGenre(genre: FormGroup): void {
    const genreId = genre.controls.genreId.value;
    this.genreDeleted.emit(genreId);
  }
}
