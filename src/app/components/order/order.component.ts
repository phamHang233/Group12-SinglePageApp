import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/bookModel';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  user!: User
  ordersList!: Array<UserOrder>
  currentBook!:Book

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private bookService: BookService
  ){}

  ngOnInit(): void {
    this.getUserOrder()
  }

  getUserOrder(){
    this.user = this.authService.userValue;
    this.ordersList = new Array<UserOrder>
    this.userService.getOrderByID({cusId: this.user.id}).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        var element = new UserOrder()
        var date:string = response[i]['order_purchase_timestamp'].toString()
        element.order_purchase_timestamp = date.split('T')[0]
        element.totalPrice = 0
        var products = response[i]['products']
        for (let j = 0; j < products.length; j++){
          this.bookService.getBookById(products[j]['product_id']).subscribe(response => {
            var product = new Product()
            product.id = response._id
            product.bookName = response.bookName
            product.imagePath = response.imagePath
            product.price = products[j]['price']
            product.quantity = products[j]['quantity']
            element.totalPrice += product.price * product.quantity
            element.products.push(product)
          })
        }
        //console.log(element)
        this.ordersList.push(element)
      }
    })
    
  }
}

class UserOrder {
  order_purchase_timestamp!: string
  products: Array<Product> = new Array<Product>
  totalPrice!: number
}

class Product {
  id!:string
  bookName!:string
  imagePath!:string
  price!:number
  quantity!:number
}
