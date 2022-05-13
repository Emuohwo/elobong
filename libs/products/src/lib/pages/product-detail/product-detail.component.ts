import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product?: Product;
  endSub$: Subject<any> = new Subject();
  quantity?: number

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productid']) {
        this._getProduct(params['productid'])
      }
    })
  }

  ngOnDestroy(): void {
    // this.endSub$.next()
      this.endSub$.complete();
  }

  addProductToCart() {
    // 
  }

  private _getProduct(id: string) {
    this.prodService.getProduct(id)
    .pipe(takeUntil((this.endSub$)))
    .subscribe(prod => {
      this.product = prod;
    })
  }

}
