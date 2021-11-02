import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  Name = '';
  Email = '';
  userId = 0;
  isGrid = true;
  isSearch = false;
  isOption = 1;
  isOptions: string = '';
  searchInp = '';
  expand = true;
  toggle = false;
  clickSearch = true;
  searchIcon = true;
  userLabels = [];
  labelDetails: any;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getFromLocalStorage();
  }
  async getFromLocalStorage() {
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    this.Name = user.firstName + ' ' + user.lastName;
    this.Email = user.email;
    this.userId = user.userId;
  }
  routeNotes() {
    this.route.navigateByUrl('/dashboard/notes');
  }
  Logout() {
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    if (user != null) {
      localStorage.removeItem('FundooUser');
      this.route.navigateByUrl('/login');
    }
  }
  changeSearch(event: any) {
    console.log(event.target.value);
    return event.target.value;
  }
  checkLocalStorage() {
    var user = localStorage.getItem('FundooUser');
    if (user == null) {
      this.route.navigateByUrl('/login');
    }
  }
}
