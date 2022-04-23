import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../models/product';
import { Observable } from 'rxjs';

import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products'

  constructor( private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts)
  }

  // getCategory(categoryId: string): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiURLProducts}/${categoryId}`)
  // }

  // createCategory(category: Product): Observable<Product> {
  //   return this.http.post<Product>(
  //     this.apiURLProducts,
  //     category
  //   )
  // }

  // updateCategory(category: Product): Observable<Product> {
  //   return this.http.put<Product>(
  //     `${this.apiURLProducts}/${category.id}`, 
  //     category
  //   )
  // }

  // deleteCategory(categoryId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiURLProducts}/${categoryId}`)
  // }

}
