import {
  AfterViewInit,
  Component,
  OnInit,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  note: any;
  notes: any;
  token: any;

  constructor(
    private http: HttpClient,
    private userService: UserServiceService,
    private dataService:DataServiceService,
      private dialog: MatDialog
  ) {}

  receiveMessage($event: any) {
    this.note = $event;
    console.log(this.note);
  }
  ngOnInit(): void {
    this.getAllNotes();
    this.dataService.currentMessage.subscribe((change) => {
      if (change == true) {
        this.getAllNotes();
        this.dataService.changeMessage(false);
      }
    });
  }

  getAllNotes() 
  {
    this.userService.getAllNotes().subscribe(
      (result: any) => {
        console.log(result);
        this.notes=result.data;
        
      },
      (error: HttpErrorResponse) => {
        if (error.error.message == '') {
          console.log(error.error.message);
        }
      }
    );
  }

}
