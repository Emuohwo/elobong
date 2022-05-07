import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@elobong/orders';
import { ProductsService } from '@elobong/products';
import { UsersService } from '@elobong/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  allUsers = 0;
  totalSales = 0;
  numOfOrders = 0;

  statistics: number[] = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}


  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
      console.log('values', values)
    });
  }
  // ngOnInit(): void {
  //   this._getUsersStats();
  //   this._getTotalSales();
  //   this._getOrdersCount();
  // }

  // private _getUsersStats(){
  //   this.userService.getUserCount().subscribe(
  //     (count)=> {
  //       this.allUsers = count.userCount
  //     }
  //   )
  // }

  // private _getTotalSales(){
  //   this.ordersService.getTotalSales().subscribe(
  //     (count)=> {
  //       this.totalSales = count.totalSales
  //     }
  //   )
  // }
  
  // private _getOrdersCount(){
  //   this.ordersService.getOrdersCount().subscribe(
  //     (count)=> {
  //       this.numOfOrders = count.orderCount
  //     }
  //   )
  // }

}
