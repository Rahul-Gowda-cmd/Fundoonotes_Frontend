import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  //token = localStorage.getItem('FunDooNotesJWT');
  user=localStorage.getItem('FundooUser')
  token: any;

  constructor(private httpService: HttpServiceService) {}

  Register(data: any) {
    const params = {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Password: data.password,
    };
    return this.httpService.post(`${environment.baseUrl}/api/register`, params);
  }
  Login(data: any) {
    const params = {
      Email: data.email,
      Password: data.password,
    };
    return this.httpService.post(`${environment.baseUrl}/api/login`, params);
  }
  Forgot(data: any) {
    return this.httpService.post(
      `${environment.baseUrl}/api/ForgetPassword?email=${data.email}`
    );
  }
  Reset(email: string, data: any) {
    let params = {
      EmailId: email,
      Password: data.password,
    };
    return this.httpService.put(
      `${environment.baseUrl}/api/resetPassword`,
      params
    );
  }

  addNotes(data: any) {
    this.token = localStorage.getItem('FunDooNotesJWT');
       var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );
    let Options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(Options);
    return this.httpService.post(
      `${environment.baseUrl}/api/addNotes`,
      data,
      true,
      Options
    );
  }

  getAllNotes() {
    this.token = localStorage.getItem('FunDooNotesJWT');
     var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );
     let Options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(Options);
    return this.httpService.get(
      `${environment.baseUrl}/api/GetNotes?userId=${parseInt(JSON.parse(this.user!).userId)}`,
      true,
      Options
    );
  }

  TrashNote(noteId: any ) {
    this.token = localStorage.getItem('FunDooNotesJWT');
     var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );
     let Options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(Options);
    return this.httpService.put(
      `${environment.baseUrl}/api/TrashNote?notesId=${noteId}`,
      null,
      true,
      Options
    );
  }

  archive(noteId: any ) {
    this.token = localStorage.getItem('FunDooNotesJWT');
     var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );
     let Options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(Options);
    return this.httpService.put(
      `${environment.baseUrl}/api/ArchiveNote?notesId=${noteId}`,
      null,
      true,
      Options
    );
  }
  
   updateNotes(
    id: any,
    data: any,
    pin: any,
    archive: any,
    color: any,
    remainder: any,
    image: any
  ) {
    let params = {
      NoteId: id,
      Title: data.title,
      Body: data.Desc,
      Reminder: remainder,
      Color: color,
      Is_Archieve: archive,
      Is_Pin: pin,
      Image: image,
    };
    this.token = localStorage.getItem('FunDooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };

    return this.httpService.put(
      `${environment.baseUrl}/api/UpdateNotes`,
      params,
      true,
      options
    );
  }
  
  getTrash() {
    this.token = localStorage.getItem('FunDooNotesJWT');
     var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );
     let Options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(Options);
    return this.httpService.get(
      `${environment.baseUrl}/api/GetTrash?userId=${parseInt(JSON.parse(this.user!).userId)}`,
      true,
      Options
    );
  }

   restore(data:any)
   {
     console.log(data);
    this.token = localStorage.getItem('FunDooNotesJWT');
     var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );
     let Options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(Options);
    return this.httpService.post
    (`${environment.baseUrl}/api/RestoreNote?notesId=${data}`,
    null,true,Options
    );
  }
  

  deleteFromTrash(noteId:any){
    this.token = localStorage.getItem('FunDooNotesJWT');
     var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );
     let Options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(Options);
    return this.httpService.delete(
      `${environment.baseUrl}/api/DeleteNotes?NotesId=${noteId}`,
      true,
      Options
    );
  }

  getArchive() {
    this.token = localStorage.getItem('FunDooNotesJWT');
     var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );
     let Options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(Options);
    return this.httpService.get(
      `${environment.baseUrl}/api/GetArchive?userId=${parseInt(JSON.parse(this.user!).userId)}`,
      true,
      Options
    );
  }
}
