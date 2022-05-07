import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';

import { environment } from '@env/environment'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiURL + 'users'

  constructor( private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers)
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`)
  }

  // getUserCount() : Observable<any> {
  //   return this.http.get<any>(`${this.apiURLUsers}/get/count`)
  // }
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiURLUsers}/register`,
      user
    )
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiURLUsers}/${user.id}`, 
      user
    )
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`)
  }

}
