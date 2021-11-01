import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

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
    this.updateColor(color, this.notesId);
  }

  response: any;
  token: any;
  updateColor(color: any, notesId: number) {
    this.token = localStorage.getItem('FunDooNotesJWT');
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.http
      .put(
        `https://localhost:44329/Notes/AddColor/${notesId}`,
        { Color: `${color}` },
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.response = res;
          if (this.response.success == true) {
            console.log('Color Updated');
            this.reloadCurrentRoute();
          }
        },
        (error) => {
          console.log(error);
          if (error.status == 401) {
            console.log('fail');
          }
        }
      );
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
