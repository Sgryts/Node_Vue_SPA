import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import IPhoto from '../../../../../models/photo.model';
import IGenre from '../../../../../models/genre.model';
import { AdminStateFacade } from 'src/app/admin/state/state.facade';

@Component({
  selector: 'app-photos-delete-dialog',
  templateUrl: './photos-delete-dialog.component.html',
  styleUrls: ['./photos-delete-dialog.component.css']
})
export class PhotosDeleteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<PhotosDeleteDialogComponent>,
    private adminFacade: AdminStateFacade,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  public onDismiss(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    console.log("d", this.data);
    this.adminFacade.deletePhoto$(this.data);
    this.dialogRef.close(this.data);
  }

}
