import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  token = '';
  hide = false;
  email = '';
  ResetForm!: FormGroup;

  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.token += params.get('token');
    });
    //this.check(this.token);
    this.ResetForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'
        ),
      ]),
      confirm: new FormControl('', Validators.required),
    });
  }

  Reset() {
    if (!this.ResetForm.invalid) {
      this.userService
        .Reset(this.email, this.ResetForm.value)
        .subscribe((result: any) => {
          this.snackBar.open(result.message, '', { duration: 25000 });
          if (result.status == true) {
            this.router.navigateByUrl('/login');
          }
        });
    }

    (error: HttpErrorResponse) => {
      if (error.error.message == 'Token Expired') {
        this.snackBar.open('Token Expired! Please send another request!', '');
      }
    };
  }
}
