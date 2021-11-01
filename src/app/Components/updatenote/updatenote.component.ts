import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
//import { DialogComponent } from '../dialog/dialog.component';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'MMM dd,yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
    DatePipe,
  ],
})
export class UpdatenoteComponent implements OnInit {
  dispNote = false;
  DescNote: string = '';
  TitleNote: string = '';
  NotesForm!: FormGroup;
  animal: string = '';
  name: string = JSON.parse(localStorage.getItem('FundooUser')!).userName;
  email: string = JSON.parse(localStorage.getItem('FundooUser')!).emailId;
  dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  colourArr = [
    { colour: 'white', tooltip: 'White' },
    { colour: '#f28b82', tooltip: 'Red' },
    { colour: '#fbbc04', tooltip: 'Orange' },
    { colour: '#fff475', tooltip: 'Yellow' },
    { colour: '#ccff90', tooltip: 'Green' },
    { colour: '#a7ffeb', tooltip: 'Teal' },
    { colour: '#cbf0f8', tooltip: 'Blue' },
    { colour: '#aecbfa', tooltip: 'Dark Blue' },
    { colour: '#d7aefb', tooltip: 'Purple' },
    { colour: '#fdcfe8', tooltip: 'Pink' },
    { colour: '#e6c9a8', tooltip: 'Brown' },
    { colour: '#e8eaed', tooltip: 'Gray' },
  ];
  collaboratorArr = [];
  remainder: string = '';
  addRemainder: string = '';
  selectable = true;
  removable = true;
  addOnBlur = true;
  tickcolor = 'white';
  setColor = 'white';
  pinned = false;
  startDate: any;
  timemenu = false;
  isarchive = false;
  timeValue = '8:00AM';
  noteLabels = [];
  imageUrl = '';

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatenoteComponent>,
    private noteservice: UserServiceService,
    private snack: MatSnackBar,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.NotesForm = new FormGroup({
      title: new FormControl(''),
      Desc: new FormControl(''),
    });
    this.setValues();
    this.getDate();
  }
  // openDialog() {
  //   let dialogref = this.dialog.open(DialogComponent, {
  //     data: {
  //       name: this.name,
  //       email: this.email,
  //       collab: this.collaboratorArr,
  //     },
  //   });
  //   dialogref.afterClosed().subscribe((result) => {
  //     console.log(result);
  //     this.collaboratorArr = result;
  //   });
  // }
  autogrow() {
    var textArea = document.getElementById('notes')!;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  checkMenu(event: any) {
    return event.target.value;
  }
  getDate() {
    let date = new Date().getDay();
    this.remainder = this.dayArr[date] + ', 8:00AM';
  }
  setRemainder() {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    this.addRemainder =
      this.monthArr[date.getMonth()] + ' ' + date.getDate() + ', 8:00AM';
    this.startDate = date;
    console.log(this.addRemainder);
  }
  set() {
    this.startDate = new Date();
  }
  setTom() {
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() + 1);
  }
  getDateTime(data: any, time: any) {
    console.log(data);
    console.log(time);
    var date = new Date();
    var today =
      this.monthArr[date.getMonth()] +
      ' ' +
      date.getDate() +
      ',' +
      date.getFullYear();
    console.log(today);
    if (data == today) {
      data = 'Today';
    }
    date.setDate(date.getDate() + 1);
    var tom =
      this.monthArr[date.getMonth()] +
      ' ' +
      date.getDate() +
      ',' +
      date.getFullYear();
    if (data == tom) {
      console.log(tom);
      data = 'Tommorow';
    }
    //console.log(today);
    this.addRemainder = data + ', ' + time;
  }
  setValues() {
    console.log(this.data);
    this.TitleNote = this.data.title;
    this.DescNote = this.data.body;
    this.startDate = this.data.remainder;
    this.setColor = this.data.color;
    this.pinned = this.data.is_Pin;
    this.isarchive = this.data.is_Archive;
    this.addRemainder = this.data.remainder;
    this.imageUrl = this.data.image;
  }

  update() {
      this.noteservice
        .updateNotes(
          this.data.noteId,
          this.NotesForm.value,
          this.pinned,
          this.isarchive,
          this.setColor,
          this.addRemainder,
          this.imageUrl
        )
        .subscribe((result: any) => {
         this.dataService.changeMessage(true);
          this.snack.open(result.message, '', { duration: 3000 });
        });
  }
}