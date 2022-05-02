import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@elobong/orders';

const ORDER_STATUS: object = {
  0: {
    label: 'Pending',
    color: 'primary'
  },
  1: {
    label: 'Processed',
    color: 'warning'
  },
  2: {
    label: 'Shipped',
    color: 'warning'
  },
  3: {
    label: 'Delivered',
    color: 'success'
  },
  4: {
    label: 'Failed',
    color: 'danger'
  },
}
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = []
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe(
      (orders) => {
        this.orders = orders
        console.log(orders)
      }
    )
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }

}