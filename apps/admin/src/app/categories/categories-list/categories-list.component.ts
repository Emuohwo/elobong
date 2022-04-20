import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@elobong/products'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = []

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getCategories()
  }

  deleteCategory(categoryId: string) {
    this.categoriesService.deleteCategory(categoryId).subscribe(res => {
      this._getCategories();
      this.messageService.add({
        severity:'success', summary:'Success', detail: res.message
      });
    },
    (error) => {
      this.messageService.add({
        severity:'error', summary:'Error', detail:'Category was not deleted, Please try again later'
      });
    })
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    })
  }

}
