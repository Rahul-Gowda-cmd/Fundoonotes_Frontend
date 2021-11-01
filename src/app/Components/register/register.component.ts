import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;
  hide = false;

  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-z]{1,}$'),
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-z]{2,}([\\s]{0,1}[A-Za-z]{1,})*$'),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'
        ),
      ]),
      confirm: new FormControl('', Validators.required),
    });
  }
  Register() {
    this.userService.Register(this.RegisterForm.value).subscribe(
      (result: any) => {
        console.log(result);
        this.snackBar.open(result.message, '', { duration: 30000 });
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, '', { duration: 30000 });
        if (error.error.message == 'User Already Exist') {
          console.log(error.error.message);
          this.router.navigateByUrl('/login');
        }
      }
    );
  }
}
