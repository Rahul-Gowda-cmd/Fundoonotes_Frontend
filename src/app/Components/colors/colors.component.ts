import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit {
  constructor(private noteservice:UserServiceService,
    private http: HttpClient,private snack : MatSnackBar,
    private data:DataServiceService, private router: Router) {}

  
  ngOnInit(): void {}
  colors = [
    'white',
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#fdcfe8',
    '#e6c9a8',
    '#e8eaed',
  ];

  @Input() notesId: any;
  @Output() messageEvent = new EventEmitter<string>();
  sendColor(color: any) {
    this.messageEvent.emit(color);
    console.log(this.notesId);
     this.noteservice
        .updateColor(
          color,
          this.notesId,
        )
        .subscribe((result: any) => {
         this.data.changeMessage(true);
          this.snack.open(result.message, '', { duration: 3000 });

        });
  }

  // response: any;
  // token: any;
  // updateColor(color: any, notesId: number) {
  //     this.noteservice
  //       .updateColor(
  //         this.data.noteId,
  //         this.setColor,
  //       )
  //       .subscribe((result: any) => {
  //        this.dataService.changeMessage(true);
  //         this.snack.open(result.message, '', { duration: 3000 });

  //       });
}

