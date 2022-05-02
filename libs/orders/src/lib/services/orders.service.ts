import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

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

  getCategory(categoryId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${categoryId}`)
  }

  createOrder(category: Order): Observable<Order> {
    return this.http.post<Order>(
      this.apiURLOrders,
      category
    )
  }

//   updateCategory(category: Category): Observable<Category> {
//     return this.http.put<Category>(
//       `${this.apiURLOrders}/${category.id}`, 
//       category
//     )
//   }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`)
  }

}
