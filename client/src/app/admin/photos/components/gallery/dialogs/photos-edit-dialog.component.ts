import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
export class PhotosEditDialogComponent implements OnInit {

  public form: FormGroup;
  public genres: Array<IGenre> = [];

  constructor(public dialogRef: MatDialogRef<PhotosEditDialogComponent>,
    private adminFacade: AdminStateFacade,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: { genres: Array<IGenre>; photo: IPhoto }) { }


  @ViewChild('multiSelect') multiSelect;
  public loadContent: boolean = false;
  public name: string = 'Genres Select Dropdown';
  public placeholder: string = 'Select Genre(s)';
  public settings: IDropdownSettings = {};

  ngOnInit(): void {
    this.genres = this.dialogData.genres;
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

  get f(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  public setForm(): void {
    this.form = this.fb.group({
      name: [this.dialogData.photo.name,
      [Validators.required, Validators.minLength(1),
      Validators.maxLength(255)]],
      genres: [this.dialogData.photo.genres,
      [Validators.required, this.genresValidator()]]
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
    this.adminFacade.updatePhoto$({
      _id: this.dialogData.photo._id,
      name: this.f.name.value,
      genres: this.f.genres.value.map((g: IGenre): string => g._id)
    });
    this.dialogRef.close(this.dialogData);
  }
}
