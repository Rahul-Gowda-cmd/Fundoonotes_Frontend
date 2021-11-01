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

    if (this.noteForm.value.title != '' || this.noteForm.value.body != '') {
      let reqData = {
        UserId: parseInt(this.user.userId),
        Title: this.noteForm.get('title')?.value,
        Body: this.noteForm.get('body')?.value,
      };
      console.log(reqData);

      this.userService.addNotes(reqData).subscribe(
        (response: any) => {
          console.log(response)
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
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
