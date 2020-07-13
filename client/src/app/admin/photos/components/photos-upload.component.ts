import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import IGenre from '../../../models/genre.model';
import { IPhotoUpload } from '../photo-upload.model';

@Component({
  selector: 'admin-photos-upload',
  templateUrl: './photos-upload.component.html',
  styleUrls: ['./photos-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosUploadComponent implements OnInit {
  @Input() genres: IGenre[];
  @Input() completed: boolean;
  @Input() progress: number;
  @Input() error: string;
  @Input() isInProgress: boolean;
  @Input() isReady: boolean;
  @Input() hasFailed: boolean;

  @Output() photoUploaded: EventEmitter<IPhotoUpload> = new EventEmitter<IPhotoUpload>();
  @Output() photoUploadedReset: EventEmitter<void> = new EventEmitter<void>();
  @Output() photoUploadedCanceled: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('multiSelect') multiSelect;

  public form: FormGroup;
  public loadContent: boolean = false;
  public name = 'Genres Select Dropdown';
  public placeholder = 'Select Genre(s)';
  public data = [];
  public settings: IDropdownSettings = {};
  public selectedItems = [];
  private file: File | null;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.settings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 250,
      itemsShowLimit: 5,
      searchPlaceholderText: 'Search Genre',
      noDataAvailablePlaceholderText: 'No Genres Available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.setForm();
  }

  public setForm() {
    this.form = this.fb.group({
      name: [null,
        [Validators.required, Validators.minLength(1),
          Validators.maxLength(255)]],
      genres: [null,
        [Validators.required, this.genresValidator()]],
      image: [null,
        [Validators.required]]
    });
    this.loadContent = true;
  }

  get f() {
    return this.form.controls;
  }

  public save() {
    console.log('fff', {
      name: this.form.get('name').value,
      image: this.file,
      genres: this.form.get('genres').value.map((v) => v._id)
    });

    this.photoUploaded.emit({
      name: this.form.get('name').value,
      file: this.file,
      genres: this.form.get('genres').value.map((v) => v._id)
    });
  }

  public resetForm() {
    this.setForm();
    this.multiSelect.toggleSelectAll();
  }

  // APIs:
  public onFilterChange(item: any) {
    console.log(item);
  }

  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    console.log(item);
  }

  public onDeSelect(item: any) {
    console.log(item);
  }

  public onSelectAll(items: any) {
    console.log(items);
  }

  public onDeSelectAll(items: any) {
    console.log(items);
  }

  public uploadPhoto(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
    event.srcElement.value = null;
  }

  public resetPhotoUpload(): void {
    this.resetForm();
    this.photoUploadedReset.emit();
  }

  public cancelPhotoUpload(): void {
    this.resetForm();
    this.photoUploadedCanceled.emit();
  }

  private genresValidator() {
    return (c: FormControl) => {
      if (c?.value) {
        if (c.value.some((v) => v?._id.length !== 24)) {
          return {
            genresInvalid: true
          };
        }
      }
      return null;
    };
  }

  private fileTypeValidator(types: string[]) {
    return (c: FormControl) => {
      const file = c.value;
      if (file) {
        const extension = file.name.split('.')[1].toLocaleLowerCase();
        if (!types.includes(extension)) {
          return {
            fileTypeInvalid: true
          };
        }
        return null;
      }
      return null;
    };
  }
}
