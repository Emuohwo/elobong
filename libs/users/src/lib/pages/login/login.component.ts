import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Incorrect email or password'

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(user => {
      this.authError = false;
    },
    (error: HttpErrorResponse) => {
      console.log(error)
      this.authError = true
      if (error.status !== 400) {
        this.authMessage = 'Error in the server, please contact support'
      }
    })
  }

  get loginForm() {
    return this.loginFormGroup?.controls
  }

}
