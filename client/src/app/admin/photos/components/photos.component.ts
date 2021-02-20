import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lightbox } from 'ngx-lightbox';
import { IAlbum } from 'ngx-lightbox/lightbox-event.service';
import IGenre from '../../../models/genre.model';
import IPhoto from '../../../models/photo.model';

@Component({
  selector: 'admin-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent implements OnInit, OnChanges {
  @Input() photos: Array<IAlbum & Partial<IPhoto>>;
  @Input() genres: IGenre[];
  @Input() isLoading: boolean;
  @Output() selectedGenre = new EventEmitter<string>();
  @Output() updatedPhoto = new EventEmitter<Partial<IPhoto>>();
  @Output() deletedPhoto = new EventEmitter<string>();

  public galleryForm: FormGroup;
  public data = [];
  public data2 = [];
  page = 0;
  size = 4;

  get getPhotosFormArray(): FormArray {
    return this.galleryForm.get('photosArray') as FormArray;
  }

  public getGenresFormArray(i: number): FormArray {
    return (<FormGroup>((<FormArray>this.galleryForm.get('photosArray')).controls[i]))
      .get('genresArray') as FormArray;
  }

  constructor(private lightbox: Lightbox, private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.photos) {
      this.data2 = this.photos;
      this.setPaging({ pageIndex: this.page, pageSize: this.size });
      this.setForm();
    }
  }

  ngOnInit(): void {

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

  //#region Form
  private setForm(): void {
    this.galleryForm = this.fb.group({
      photosArray: this.fb.array([])
    });
    this.setFormArrayData(this.photos);
  }

  private setFormArrayData(photos: Array<IAlbum & Partial<IPhoto>>): void {
    photos.map((p: IAlbum & Partial<IPhoto>, i: number): void => {
      this.getPhotosFormArray.push(this.buildPhotosFormArray(p));
      this.setGenresFormArrayDate(i, p.genres);
    });
  }

  private buildPhotosFormArray(photo: IAlbum & Partial<IPhoto>) {
    return this.fb.group({
      _id: [{ value: photo._id, disabled: true },
      [Validators.required,
      Validators.min(24),
      Validators.max(24)]],
      name: [{ value: photo.name },
      [Validators.required,
      Validators.min(2),
      Validators.max(50),
      Validators.pattern(/^[A-Za-z]*$/)]],
      genresArray: this.fb.array([]),
      caption: [{ value: photo.name, disabled: true }],
      src: [{ value: photo.src, disabled: true }],
      thumb: [{ value: photo.thumb, disabled: true }],
    });
  }

  private setGenresFormArrayDate(i: number, genres: IGenre[]): void {
    genres.map((g: IGenre): void => this.getGenresFormArray(i)
      .push(this.buildGenresFormArray(g)));
  }

  private buildGenresFormArray(genre: IGenre) {
    return this.fb.group({
      _id: [{ value: genre._id, disabled: true },
      [Validators.required,
      Validators.min(24),
      Validators.max(24)]],
      name: [{ value: genre.name },
      [Validators.required,
      Validators.min(2),
      Validators.max(50),
      Validators.pattern(/^[A-Za-z]*$/)]]
    });
  }

  //#endregion FORM

  onGenreSelected(id: string) {
    this.selectedGenre.emit(id);
  }

  onPhotoUpdated(photo: IPhoto) {
    this.updatedPhoto.emit(photo);
  }

  onPhotoDeleted(id: string) {
    this.deletedPhoto.emit(id);
  }

  openSelectedImage(index$: number): void {
    this.lightbox.open(this.photos, index$,
      { wrapAround: true, showImageNumberLabel: true });
  }

  seeForm() {
    console.log('FORM', this.galleryForm);
  }

  close(): void {
    this.lightbox.close();
  }
}
