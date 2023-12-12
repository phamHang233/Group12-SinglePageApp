import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Book } from 'src/app/models/bookModel';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      400: {
        items: 3
      },
      600: {
        items: 4
      },
      800: {
        items: 5
      }
    },
    nav: true
  }
  currentPage!: number;
  booksBestSeller: Array<Book> = new Array<Book>();
  allBooks: Array<Book> = new Array<Book>();
  dataLoaded = false;
  constructor(
    private bookService: BookService,
    private orderService: OrderService
    //private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.authService.logout();
    this.getAllBook();
    //this.getAllOrder();
    //this.getBooksBestSeller();
    this.currentPage = 1;
  }

  getBooksBestSeller() {
    this.bookService.getBooksBestSeller().subscribe(response => {
      this.booksBestSeller = response;
      this.dataLoaded = true;
    })
  };

  showPage1() {
    this.currentPage = 1;
  }

  showPage2() {
    this.currentPage = 2;
  }

  showPage3() {
    this.currentPage = 3;
  }

  getAllBook(){
    console.log("Get all books");
    this.bookService.getBooks().subscribe(response => {
      this.allBooks = response;
      console.log(this.allBooks);
    });
  }

  /*getAllOrder(){
    console.log("Get all orders");
    this.orderService.getAllOrder().subscribe(response => {
      console.log(response);
    });
  }*/
}


