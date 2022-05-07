import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';

import { environment } from '@env/environment'
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiURL + 'orders'

  constructor( private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders)
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`)
  }

  createOrder(category: Order): Observable<Order> {
    return this.http.post<Order>(
      this.apiURLOrders,
      category
    )
  }
  
  // getTotalSales() : Observable<any> {
  //   return this.http.get<any>(`${this.apiURLOrders}/get/totalSales`)
  // }
  
  // getOrdersCount() : Observable<any> {
  //   return this.http.get<any>(`${this.apiURLOrders}/get/count`)
  // }
    
  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/totalSales`)
      .pipe(map((objectValue: any) => objectValue.totalSales));
  }

  updateOrder(orderStatus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(
      `${this.apiURLOrders}/${orderId}`, 
      orderStatus
    )
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`)
  }

}
