import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
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
  user: User = this.authService.userValue
  ordersList!: Array<UserOrder>
  currentProduct!:Product

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private bookService: BookService
  ){}

  ngOnInit(): void {
    this.getUserOrder()
  }

  getUserOrder() {
    //console.log(this.user.id)
    this.ordersList = new Array<UserOrder>
    this.userService.getOrderByID({ cusId: this.user.id }).subscribe(async response => {
      await response.forEach(async (order: any) => {
        var userOrder: UserOrder = new UserOrder
        userOrder.order_purchase_timestamp = order.order_purchase_timestamp.toString().split('T')[0]
        userOrder.totalPrice = 0;
        var productsList: Array<Product> = new Array<Product>
        await order['products'].forEach((product:any) => {
          this.bookService.getBookById(product.product_id).subscribe(response => {
            console.log(response)
            var p = new Product
            p.id = response._id
            p.bookName = response.bookName
            p.imagePath = response.imagePath
            p.quantity = product.quantity
            p.price = product.price
            userOrder.totalPrice += product.price
            productsList.push(p)
          })
        });
        userOrder.products = productsList
        this.ordersList.push(userOrder)
      });
    })
    //console.log(this.productsList)
  }

  getBook(){

  }

  getTime(timeStr: any){
    return timeStr.toString().split('T')[0]
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
