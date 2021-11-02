import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-takenote',
  templateUrl: './takenote.component.html',
  styleUrls: ['./takenote.component.scss'],
})
export class TakenoteComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  noteForm: FormGroup;
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  smallNote: boolean = true;
  bigNote: boolean = false;
  tickcolor = 'white';
  setColor = 'white';
  notecolor: any;
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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService
  ) {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.maxLength(200), Validators.minLength(1)]],
      body: ['', [Validators.maxLength(400)]],
    });
  }

  ngOnInit(): void {}
  response: any;
  token: any;

  close() {
    console.log(this.noteForm?.value);
    this.messageEvent.emit(this.noteForm?.value);
    this.smallNote = true;
    this.bigNote = false;

    if (this.noteForm.value.title != '' || this.noteForm.value.body != '') {
      let reqData = {
        UserId: parseInt(this.user.userId),
        Title: this.noteForm.get('title')?.value,
        Body: this.noteForm.get('body')?.value,
        Color: this.setColor,
      };
      console.log(reqData);

      this.userService.addNotes(reqData).subscribe(
        (response: any) => {
          console.log(response);

          this.reloadCurrentRoute();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 401) {
            console.log('fail', error.error?.message);
          }
        }
      );
    }
  }

  showNote() {
    this.smallNote = false;
    this.bigNote = true;
  }

  // ChangeColor(color: any) {
  //   this.notecolor = color;
  //   for (var val of this.colourArr)
  //     val.icon = val.colour == color ? true : false;
  // }

  color: any;
  receiveMessage($event: any) {
    this.color = $event;
    console.log(this.color);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
