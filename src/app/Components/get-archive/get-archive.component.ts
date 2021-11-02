import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';

@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss']
})
export class GetArchiveComponent implements OnInit {
archiveNotes=[];

  constructor(private noteservice:UserServiceService,private dialog:MatDialog,
    private snack:MatSnackBar,
    private data:DataServiceService) { }

  ngOnInit(): void {
  this.getArchive();
    this.data.currentMessage.subscribe((change)=>{
        if(change == true){
          this.getArchive();
          this.data.changeMessage(false);
        }
    })
  }

 getArchive(){
 this.noteservice.getArchive().subscribe((result:any)=>{
   console.log(result.data);
   this.archiveNotes = result.data;
 })
 }
 openNoteDialog(notes:any){
  let dialogref = this.dialog.open(UpdatenoteComponent,{data:{notes}});
  dialogref.afterClosed().subscribe((result)=>{
    console.log(result);
   })
  }

}
