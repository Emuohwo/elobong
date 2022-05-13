import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  endSub$: Subject<any> = new Subject();
  featuredProducts:Product[] = [];

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
      // this.endSub$.next()
      this.endSub$.complete()
  }

  private _getFeaturedProducts() {
    this.prodService.getFeaturedProducts(4)
    .pipe(takeUntil(this.endSub$))
    .subscribe(prods => {
      this.featuredProducts = prods
    })
  }

}
