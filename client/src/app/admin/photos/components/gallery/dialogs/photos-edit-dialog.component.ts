import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import IPhoto from '../../../../../models/photo.model';
import IGenre from '../../../../../models/genre.model';
import { AdminStateFacade } from '../../../../../admin/state/state.facade';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-photos-edit-dialog',
  templateUrl: './photos-edit-dialog.component.html',
  styleUrls: ['./photos-edit-dialog.component.css']
})
export class PhotosEditDialogComponent implements OnInit, OnDestroy {

  private isActive: boolean = true;
  public form: FormGroup;
  public genres: Array<IGenre> = [];

  constructor(public dialogRef: MatDialogRef<PhotosEditDialogComponent>,
    private adminFacade: AdminStateFacade,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { genres: Array<IGenre>; photo: IPhoto }) { }


  @ViewChild('multiSelect') multiSelect;
  public loadContent: boolean = false;
  public name: string = 'Genres Select Dropdown';
  public placeholder: string = 'Select Genre(s)';
  // public multiselectData: IGenre[] = [];
  public settings: IDropdownSettings = {};

  ngOnInit(): void {
    this.genres = this.data.genres;
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

  ngOnDestroy(): void {
    this.isActive = false;
  }

  get f(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  public setForm(): void {
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

  public resetForm(): void {
    this.setForm();
    this.multiSelect.toggleSelectAll();
  }

  private genresValidator() {
    return (c: FormControl) => {
      if (c?.value) {
        if (c.value.some((v: IGenre): boolean =>
          v?._id.length !== 24)) {
          return {
            genresInvalid: true
          };
        }
      }
      return null;
    };
  }

  public onDismiss(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    console.log("d", this.data);
    this.dialogRef.close(this.data);
  }
}
