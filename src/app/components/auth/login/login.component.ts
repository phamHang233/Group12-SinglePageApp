import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, of, tap } from 'rxjs';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  submitted = false;
  user!: User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  get f() { return this.loginForm.controls; }

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
    this.submitted = true;
    if (this.loginForm.valid) {
      const userLogin = this.loginForm.value;
      this.authService.login(userLogin).subscribe(
        (response: any) => {
          if (response.status) {
            this.toasterService.success("Đăng nhập thành công!");
            console.log(response);
            this.user = response.information
            this.user.first_name = response.information.firstName
            this.user.last_name = response.information.lastName
            console.log(this.user);
            localStorage.setItem("user", JSON.stringify(this.user));
            this.authService.onRefresh();
            
            if (response.information.role == "user") {
              this.router.navigate(['/']);
            }
            else if (response.information.role == "admin") {
              this.router.navigate(['/admin'])
            }
          }
          else {
            this.toasterService.error("Tài khoản hoặc mật khẩu không chính xác!");
          }
        },
        error => {
          console.log("Lỗi từ API:", error);
          return of(null);
        })
    }
  }
}