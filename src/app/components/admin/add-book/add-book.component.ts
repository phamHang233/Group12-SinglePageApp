import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { MatSnackBar, MatSnackBarConfig,  } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  // styles: [`
  //   :host ::ng-deep .success-snackbar {
  //     background-color: green;
  //     color: white;
  //   }

  //   :host ::ng-deep .failure-snackbar {
  //     background-color: red;
  //     color: white;
  //   }
  // `],
  // encapsulation: ViewEncapsulation.None, // Use ViewEncapsulation.None to allow ::ng-deep
})
export class AddBookComponent implements OnInit {
  bookFormCreate!: FormGroup;
  localUrl!: string;
  dataLoaded = false;
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private formBuilder: FormBuilder,

    private router: Router,

    private toasterService: ToastrService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,

  ) {

  }
  ngOnInit(): void {
    this.createBookForm();
    //this.openSnackBar('Operation successful', 'success-snackbar');
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (e.g., 3000 for 3 seconds)
      panelClass: [panelClass], // Panel class
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
  createBookForm() {
    this.bookFormCreate = this.formBuilder.group({
      bookName: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      salePrice: ["", Validators.required],
      description: [""],
      category: [""],
      imagePath: [""],
      author: ["", Validators.required],



    })
  }
  handleFileInputChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.bookFormCreate.value.imagePath = event.target.result;
      }
      var path = reader.readAsDataURL(event.target.files[0]);
    }

  }
  saveShow() {
    if (this.bookFormCreate.valid) {

      this.bookService.addBook(this.bookFormCreate.value).subscribe(response => {

        if (response.status) {
          this.openSnackBar('Thêm sản phẩm thành công', 'success-snackbar');
          // this.snackBar.openFromComponent(successComponent, {
          //   duration: 3000,
          // });
          this.router.navigate(['/adminBooks'])
        }
        else
        this.openSnackBar('Thêm sản phẩm thất bại', 'failure-snackbar');
        // this.snackBar.openFromComponent(failedComponent, {
        //   duration: 3000,
        // });
      });

    }

  }
  logout() {
    this.authService.logout()

  }
}

// @Component({
//   selector: 'success',
//   templateUrl: 'success.html',
//   styles: [`
//     .success {
//       color: green !important;
//     }
//   `],
// })
// export class successComponent {}
// @Component({
//   selector: 'failed',
//   templateUrl: 'failed.html',
//   styles: [`
//     .success {
//       color: green !important;
//     }
//   `],
// })
// export class failedComponent {}