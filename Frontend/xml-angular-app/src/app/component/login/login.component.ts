import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  hide = true;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.loginForm !== null && this.loginForm.get('email') !== null) {
      if (this.loginForm.get('email')?.hasError('required')) {
        return 'Email is required';
      }

      return this.loginForm.get('email')?.hasError('email')
        ? 'Not a valid email'
        : '';
    }

    return 'Not valid email';
  }

  logIn() {
    // if (isFormValid(this.loginForm)) {
      const router = this.router;
      // const loginRequest: LoginRequest = {
      //   email: this.loginForm.get('email').value,
      //   password: this.loginForm.get('password').value,
      // };

    // }
  }

  ngOnDestroy(): void {

  }
}
