import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { MatSnackBar, MatSnackBarConfig,  } from '@angular/material/snack-bar';
import { numbers } from '@material/snackbar';

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
  imagePreview: string | null = null;
  bookFormCreate!: FormGroup;
  localUrl!: string;
  dataLoaded = false;
  selectedFileName: string | null = null;
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
      dailyPrice: [0],
      salePrice: [0],
      description: [""],
      category: [""],
      imagePath: [""],
      author: ["", Validators.required],
      star: [0],


    })
  }

  handleFileInputChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.selectedFileName = event.target.files[0].name;
  
        // Call saveForm when the image is loaded
        this.saveForm();
      };
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  saveForm() {
    if (this.selectedFileName) {
      this.bookFormCreate.patchValue({ imagePath: `assets/images/${this.selectedFileName}` });
    }
  
    // Perform other form-saving logic here
  }

getImageUrl(): string | null {
  // Assuming 'assets/images/' is the directory where your images are stored
  return this.imagePreview ? `assets/images/${this.imagePreview}` : null;
}
  saveShow() {
    if (this.bookFormCreate.valid) {

      this.bookService.addBook(this.bookFormCreate.value).subscribe(response => {

        if (response.status) {
          this.toasterService.success('Cập nhật thành công')
          //this.openSnackBar('Thêm sản phẩm thành công', 'success-snackbar');
          //console.log(this.bookFormCreate.value);
          // this.snackBar.openFromComponent(successComponent, {
          //   duration: 3000,
          // });
          this.router.navigate(['/adminBooks'])
        }
        else
        this.toasterService.error('Cập nhật thất bại')
        //this.openSnackBar('Thêm sản phẩm thất bại', 'failure-snackbar');
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