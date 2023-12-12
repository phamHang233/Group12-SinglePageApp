import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  orders!: Order;
  numOrder!: Number;
  uniqueCustomerIds!: Number;
  orderCounts: { [date: string]: number } = {};
  orderPrice: { [date: string]: number } = {};


  totalPrice!: number;
  @ViewChild('chartCanvasOrder') chartCanvasOrder: ElementRef | undefined;
  @ViewChild('chartCanvasPrice') chartCanvasPrice: ElementRef | undefined;

  lineChart: Chart | undefined;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
  ) {

  }
  ngOnInit() {
    const body = document.querySelector("body")!;

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll(".sidebar .sidebar-item").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
    this.orderService.getAllOrder().subscribe(data => {
      if (data != undefined) {

        this.numOrder = data.length; // Đếm tổng số bản ghi từ mảng dữ liệu trả về
        this.uniqueCustomerIds = [...new Set(data.map(order => order.customer_id))].length;
        this.totalPrice = data.reduce((total, order) => total + order.price, 0);
        this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
        data.forEach(order => {
          const orderDate = new Date(order.order_purchase_timestamp);
          const monthYear = orderDate.getMonth() + 1 + '-' + orderDate.getFullYear();
          if (this.orderCounts[monthYear]) {
            this.orderCounts[monthYear]++;
            this.orderPrice[monthYear] += Math.ceil(order.price);
          } else {
            this.orderCounts[monthYear] = 1;
            this.orderPrice[monthYear] = Math.ceil(order.price);

          }
        });
        // console.log(this.orderCounts)
        this.createChart();
      }
    }
    )
  }



  logout() {
    this.authService.logout()

  }

  createChart() {
    if (this.chartCanvasOrder) {
      const chartElement = this.chartCanvasOrder.nativeElement;
      const ctx = chartElement.getContext('2d');
      // Replace undefined values with 0
      const data = [
        this.orderCounts["1-2023"] || 0,
        this.orderCounts["2-2023"] || 0,
        this.orderCounts["3-2023"] || 0,
        this.orderCounts["4-2023"] || 0,
        this.orderCounts["5-2023"] || 0,
        this.orderCounts["6-2023"] || 0,
        this.orderCounts["7-2023"] || 0,
        this.orderCounts["8-2023"] || 0,
        this.orderCounts["9-2023"] || 0,
        this.orderCounts["10-2023"] || 0,
        this.orderCounts["11-2023"] || 0,
        this.orderCounts["12-2023"] || 0,
      ];
      // Log the data for debugging
      //console.log("Data:", [this.orderCounts["1-2023"], this.orderCounts["2-2023"], this.orderCounts["3-2023"], this.orderCounts["4-2023"], this.orderCounts["5-2023"], this.orderCounts["6-2023"], this.orderCounts["7-2023"], this.orderCounts["8-2023"], this.orderCounts["9-2023"], this.orderCounts["10-2023"], this.orderCounts["11-2023"], this.orderCounts["12-2023"]]);
      // Clear the canvas
      ctx.clearRect(0, 0, chartElement.width, chartElement.height);
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
          datasets: [
            {
              label: 'Số đơn hàng',
              data: data,
              borderColor: 'rgb(75, 192, 192)',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 1, // Set the minimum value for the Y-axis
              suggestedMax: 8, // Set the maximum value for the Y-axis
              title: {
                display: true,
                text: 'Số lượng đơn' // Đặt tên cho trục Y
              },

            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Số lượng đơn đặt hàng' // Đặt tiêu đề ở đây
            },


          }
        }
      });

    }


    if (this.chartCanvasPrice) {
      const chartElement = this.chartCanvasPrice.nativeElement;
      const ctx = chartElement.getContext('2d');

      //
      const data = [
        this.orderPrice["1-2023"] || 0,
        this.orderPrice["2-2023"] || 0,
        this.orderPrice["3-2023"] || 0,
        this.orderPrice["4-2023"] || 0,
        this.orderPrice["5-2023"] || 0,
        this.orderPrice["6-2023"] || 0,
        this.orderPrice["7-2023"] || 150000,
        this.orderPrice["8-2023"] || 0,
        this.orderPrice["9-2023"] || 0,
        this.orderPrice["10-2023"] || 0,
        this.orderPrice["11-2023"] || 0,
        this.orderPrice["12-2023"] || 300000,
      ];
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
          datasets: [
            {
              label: 'Thu nhập',
              data: data,
              borderColor: 'rgb(255, 102, 102)',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              suggestedMin: 100000, // Set the minimum value for the Y-axis
              suggestedMax: 1000000, // Set the maximum value for the Y-axis
              beginAtZero: true,
              title: {
                display: true,
                text: 'Doanh thu (VND)' // Đặt tên cho trục Y
              },
              ticks: {
                callback: function (value, index, values) {
                  return value.toLocaleString() + ' VND'; // Format value with currency symbol and comma separator
                }
              }

            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Tổng doanh thu' // Đặt tiêu đề ở đây
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label +=  context.parsed.y.toLocaleString() + ' VND';
                  return label;
                }
              }
            }
          }
        }
      });

    }
  }
}
