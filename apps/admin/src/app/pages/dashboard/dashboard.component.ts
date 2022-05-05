import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@elobong/orders';
import { UsersService } from '@elobong/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  allUsers = 0;
  totalSales = 0;
  numOfOrders = 0;

  constructor(
    private userService: UsersService,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this._getUsersStats();
    this._getTotalSales();
    this._getOrdersCount();
  }

  private _getUsersStats(){
    this.userService.getUserCount().subscribe(
      (count)=> {
        this.allUsers = count.userCount
      }
    )
  }

  private _getTotalSales(){
    this.ordersService.getTotalSales().subscribe(
      (count)=> {
        this.totalSales = count.totalSales
      }
    )
  }
  
  private _getOrdersCount(){
    this.ordersService.getOrdersCount().subscribe(
      (count)=> {
        this.numOfOrders = count.orderCount
      }
    )
  }

}
