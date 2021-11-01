import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  hide = true;
  ForgetForm!: FormGroup;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.ForgetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  forgot() {
    this.userService.Forgot(this.ForgetForm.value).subscribe(
      (result: any) => {
        this.snackBar.open(result.message, '', { duration: 15000 });
        if (result.status == true) {
          console.log(result);
          this.router.navigateByUrl('/login');
        }
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, '', { duration: 15000 });
        if (error.error.message == "User Doesn't Exist") {
          console.log(error.error.message);
          this.router.navigateByUrl('/register');
        }
      }
    );
  }
}
