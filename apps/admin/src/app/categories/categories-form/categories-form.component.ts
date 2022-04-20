import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@elobong/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted?: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    }
    this.categoriesService.createCategory(category).subscribe( (res) =>{
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:'Category was created successfully'
      });
      timer(2000).toPromise().then(done => {
        this.location.back()
      })
    },
    (error) => {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'An error occurred while creating category, please try agin later'
      });
    })
  }

  get categoryForm() {
    return this.form.controls
  }

}
