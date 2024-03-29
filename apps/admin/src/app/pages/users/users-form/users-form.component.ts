import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@elobong/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId!: string;
  countries: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._checkEditMode();
  }

  cancel() {
    timer(200).toPromise().then(() => {
      this.location.back()
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const user = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      password: this.userForm['password'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
    }
    if (this.editMode) {
      this._updateUser(user)
    } else {
      this._addUser(user)
    }
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id']
        this.usersService.getUser(params['id']).subscribe(user => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['street'].setValue(user.street);
          this.userForm['apartment'].setValue(user.apartment);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['city'].setValue(user.city);
          this.userForm['country'].setValue(user.country);
          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity()
        })
      }
    })
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe( (user: User) =>{
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`User ${user.name} was created successfully`
      });
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    },
    () => {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'An error occurred while creating user, please try agin later'
      });
    })
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe( (user: User) =>{
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:` ${user.name} user was created successfully`
      });
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    },
    () => {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'An error occurred while creating user, please try agin later'
      });
    })
  }

  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    // console.log(countriesLib.getNames("en", {select: "official"}));
    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });
    // console.log(this.countries)
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }

  get userForm() {
    return this.form.controls
  }

}
