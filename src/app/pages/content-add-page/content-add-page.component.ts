import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-content-add-page',
  templateUrl: './content-add-page.component.html',
  styleUrls: ['./content-add-page.component.scss']
})
export class ContentAddPageComponent implements OnInit {
  @ViewChild('addMediaDialog') addMediaDialog: TemplateRef<any>;

  newItem = {
    name: '',
    year: null,
    score: null,
    group: ''
  };
  group = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    year: new FormControl('', [Validators.required]),
    score: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required])
  });
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }
  openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.minHeight = '250px';
    this.dialog.open(this.addMediaDialog, dialogConfig);
  }
  addMedia(): void {
    this.openSnackBar(this.newItem.name + ' eklendi! But not really, cause I am not connected to any backend and I do not want to use array push, seems cheap.');
    this.newItem = {
      name: '',
      year: null,
      score: null,
      group: ''
    };
    this.dialog.closeAll();
  }
  openSnackBar(message): void {
    this.snackBar.open(message, '', {
      duration: 2500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
