import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem, OrdersService } from '@elobong/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order:Order = {};
  orderStatuses: any = []
  selectedStatus: any;
  orderItems?: OrderItem

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus()
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        // name: ORDER_STATUS[key].label
        name: ORDER_STATUS[0].label
      }
    })
    // console.log(ORDER_STATUS[0])
  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ordersService.getOrder(params['id']).subscribe(order => {
          this.order = order;
          this.selectedStatus = order.status
        })
      }
    })
  }

  onStatusChange(event:string) {
    console.log(event)
    // this.ordersService.updateOrder({ status: event?.['value'] }, this.order.id).subscribe(() => {
    //   console.log(order)
    // this.messageService.add({
    //   severity:'success',
    //   summary:'Success',
    //   detail:` order was created successfully`
    // });
    // },
    // ()=> {
    // this.messageService.add({
    //   severity:'error',
    //   summary:'Error',
    //   detail:` order was updated`
    // });
    // }
    // )
  }

}
