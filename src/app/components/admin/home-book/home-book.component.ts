import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { MatSnackBar, MatSnackBarConfig,  } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-book',
  templateUrl: './home-book.component.html',
  styleUrls: ['./home-book.component.css']
})
export class HomeBookComponent implements OnInit {
  allBooks!: Array<Book>;
  dataLoaded = false;
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(),
  })
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private toasterService: ToastrService,
    private snackBar: MatSnackBar,

  ) {

  }
  ngOnInit() {
    this.getBooks();

  }
  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (e.g., 3000 for 3 seconds)
      panelClass: [panelClass], // Panel class
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  logout() {
    this.authService.logout()

  }
  getBooks() {
    this.bookService.getBooks().subscribe(response => {
      this.allBooks = response;
      this.dataLoaded = true;
    })
  };
  onDelete(bookID: string) {
    if (confirm("Bạn muốn xóa dữ liệu?")) {
      this.bookService.deleteBook(bookID).subscribe(response => {
        this.openSnackBar('Xoá thành công', 'success-snackbar');
        this.getBooks();
      }, error => {
        console.log(error)
      })

    }
  }
  onSearch() {
    this.bookService.getBooksByName(this.searchForm.value.name).subscribe(response => {
      this.allBooks = response;
    })
  }
}
