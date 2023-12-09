import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { MatSnackBar, MatSnackBarConfig,  } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book!: Book;
  // bookImages: BookImage[] = [];
  // currentImage!: BookImage;
  dataLoaded = false;
  imageUrl = "http://localhost:3000/"
  bookFormEdit!: FormGroup;
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private snackBar: MatSnackBar,

  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["bookId"]) {
        this.getBookDetail(params["bookId"])
      }

    })

  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (e.g., 3000 for 3 seconds)
      panelClass: [panelClass], // Panel class
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  createLoginForm() {
    this.bookFormEdit = new FormGroup({
      bookName: new FormControl(`${this.book.bookName}`),
      author: new FormControl(`${this.book.author}`),
      dailyPrice: new FormControl(`${this.book.dailyPrice}`),
      salePrice: new FormControl(`${this.book.salePrice}`),
      description: new FormControl(`${this.book.description}`),
      category: new FormControl(`${this.book.category}`),
      imagePath: new FormControl(`${this.book.imagePath}`)
    });

  }

  getBookDetail(bookId: string) {
    this.bookService.getBookById(bookId).subscribe(
      (response) => {
        this.book = response;
        this.dataLoaded = true;
        this.createLoginForm();
      },
      (error) => {
        console.error('Error occurred while getting book detail:', error);
      }
    );
  }

  update() {
    console.log(this.bookFormEdit.value)
    this.bookService.updateBook(this.book._id, this.bookFormEdit.value).subscribe(
      response => {
        this.openSnackBar('Cập nhật thành công', 'success-snackbar');
        // console.log(this.book)
        this.router.navigate(['/adminBooks'])
      },
      error => {
        console.log("error: ", error)
      }
    )

  }


  logout() {
    this.authService.logout()

  }
}
