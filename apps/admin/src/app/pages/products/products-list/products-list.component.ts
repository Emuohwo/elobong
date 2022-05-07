import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@elobong/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  endsub$ : Subject<any> = new Subject()

  constructor(
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    // this.endsub$.next();
    this.endsub$.complete();
  }

  updateProduct(productId : string) {
    this.router.navigateByUrl(`products/form/${productId}`)
  }

  deleteProduct(productId:string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(res => {
          this._getProducts();
          this.messageService.add({
            severity:'success', summary:'Success', detail: res.message
          });
        },
        (error) => {
          this.messageService.add({
            severity:'error', summary:'Error', detail:'Product was not deleted, Please try again later'            
          });
          console.error(error);
        })
      },
      // reject: (type:any) => {
      // }
    });
  }

  private _getProducts() {
    this.productsService.getProducts()
    .pipe(takeUntil(this.endsub$))
    .subscribe(products => {
      this.products = products
    })
  }

}
