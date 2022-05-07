import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@elobong/products'
import {ConfirmationService, MessageService} from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endsub$ : Subject<any> = new Subject()

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getCategories()
  }

  ngOnDestroy(): void {
    // this.endsub$.next();
    this.endsub$.complete();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
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
          console.error(error);
        })
      },
      // reject: (type:any) => {
      // }
  });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories(){
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endsub$))
    .subscribe((cats) => {
      this.categories = cats;
    });
  }

}
