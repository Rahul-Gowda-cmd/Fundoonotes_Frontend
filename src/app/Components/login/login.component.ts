import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  hide = true;

  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.checkLocalStorage();
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'
        ),
      ]),
    });
  }
  Login() {
    this.userService.Login(this.LoginForm.value).subscribe(
      (result: any) => {
        console.log(result);
        this.snackBar.open(result.message, '', { duration: 3000 });
        if (result.status == true) {
          console.log(result);
          this.LocalStorage(result.data, 'FundooUser');
          this.LocalStorage(result.tokenString, 'FunDooNotesJWT');
          this.route.navigateByUrl('/dashboard');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.snackBar.open(error.error.message, '', { duration: 30000 });
      }
    );
  }
  LocalStorage(data: any, name: any) {
    var user = localStorage.getItem(name);
    if (user != null) {
      localStorage.removeItem(name);
    }
    user = data;
    localStorage.setItem(name, JSON.stringify(user));
  }
  checkLocalStorage() {
    var user = localStorage.getItem('FundooUser');
    if (user != null) {
      this.route.navigateByUrl('/dashboard');
    }
  }
}
