import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router
  ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)],]
    })
  }

  register() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const userReg = this.registerForm.value;
      userReg.role = "user";

      this.authService.register(userReg).subscribe(
        ((response: any) => {
          if (response.status) {
            this.toasterService.success("Đăng ký thành công!");
            this.authService.onRefresh();
            this.router.navigate(['/']);
          }
          else {
            this.toasterService.error("Email đã được sử dụng!");
          }
        }),
        catchError((error: any) => {
          console.log("Lỗi từ API:", error);
          return of(null);
        })
      )
    }
  }
}