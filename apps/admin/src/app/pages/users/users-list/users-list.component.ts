import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@elobong/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries'

declare const require:any;

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  users: User[] = []

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(res => {
          this._getUsers();
          this.messageService.add({
            severity:'success', summary:'Success', detail: res.message
          });
        },
        (error) => {
          this.messageService.add({
            severity:'error', summary:'Error', detail:'User was not deleted, Please try again later'            
          });
          console.error(error);
        })
      },
      // reject: (type:any) => {
      // }
  });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`)
  }

  private _getUsers(){
    this.usersService.getUsers().subscribe((_users) => {
      this.users = _users;
    })
  }

  _getCountryName(countryCode: string) {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    return countriesLib.getName(countryCode, "en");
  }
}
