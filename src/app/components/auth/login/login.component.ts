import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup
  user!: User
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.getRawValue();
      const loginModel: LoginModel = { email, password };
      this.authService.login(loginModel).subscribe(response => {
        this.user = response[0];
        if (this.user && this.user.password && this.user.password == loginModel.password){
          this.authService.onRefresh();
          this.router.navigate(['/']);
        }
      });
    }
  }
}
