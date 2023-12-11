import { Component, OnInit } from '@angular/core';
import { BookCart } from 'src/app/models/bookCartModel';
import { MatDialog } from '@angular/material/dialog';
import { FinishedComponent } from './finished/finished.component';
import { Address } from 'src/app/models/addressModel';
import { AddressPopupComponent } from './address-popup/address-popup.component';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  address!: Address;
  cartItems!: Array<BookCart>;
  totalPay = 0;
  userID!: string;
  dataLoaded = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private orderService: OrderService,
    private toasterService: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.authService.userValue != null) {
      this.userID = this.authService.userValue.id;
      console.log(this.authService.userValue);
      console.log(this.userID)
      //this.getAddrDetail(this.userID)
      // this.getAddress();

    }
    this.getCartItems();
    this.getTotalPay();

  }

  getAddrDetail(userID: string) {
    this.userService.getAddr(userID).subscribe(
      (response) => {
        this.address = response;

        this.dataLoaded = true;
      },
      (error) => {
        console.error('Error occurred while getting book detail:', error);

      }
    );
  }
  getAddress() {
    const savedAddr = localStorage.getItem("address");
    if (savedAddr) {

      this.address = JSON.parse(savedAddr);
    }
  }



  getCartItems() {
    const savedCartItems = localStorage.getItem("saleCartItems");
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
    }
  }

  getTotalPay() {
    console.log(this.cartItems)
    for (let item of this.cartItems) {
      console.log(item);
      this.totalPay = this.totalPay + item.book.salePrice * item.quantity

    }
  }

  finish(): void {
    if (this.address == null) return;
    const now = new Date();
    var orderProductCart: {product_id: string, price: number, product_category_name: string, quantity: number}[] = []
    this.cartItems.forEach(cartItem => {
      orderProductCart.push({
        product_id: cartItem.book._id, 
        price: cartItem.book.salePrice * cartItem.quantity,
        product_category_name: cartItem.book.category,
        quantity: cartItem.quantity
      })
      /*console.log(orderCart)
      this.orderService.addOrder(orderCart).subscribe(response => {
        console.log("OK")

      });*/
    });
    var orderCart = {
      products: orderProductCart,
      order_purchase_timestamp: now,
      customer_id: this.userID
    }
    console.log(orderCart);
    this.orderService.addOrder(orderCart).subscribe(response => {
      console.log(response)
    })
    localStorage.removeItem('cartItems');
    localStorage.removeItem('saleCartItems');
    const dialogRef = this.dialog.open(FinishedComponent, {
      width: '200px',
    });
    //this.onRefresh();
  }

  changeAddress() {
    const dialogRef = this.dialog.open(AddressPopupComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      //console.log(localStorage.getItem('address'));
      let addreg = JSON.parse(localStorage.getItem('address')!);
      this.address = addreg;
      console.log(this.address);
    })
    //this.getAddrDetail(this.userID);
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
}
