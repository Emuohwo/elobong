import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoriesPage?: boolean

  constructor(
    private prodService : ProductsService,
    private catsService: CategoriesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryid ? this._getProducts([params['categoryid']]) : this._getProducts()
      params.categoryid ? (this.isCategoriesPage = true) : (this.isCategoriesPage = false)
    })
    this._getProducts()
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService.getProducts(categoriesFilter)
    .subscribe(prods => {
      this.products = prods
    })
  }

  private _getCategories() {
    this.catsService.getCategories().subscribe(resCats => {
      this.categories = resCats
    })
  }

  categoryFilter() {
    const selectedCategories = this.categories
    .filter(category => category.checked)
    .map(category => category.id);
    // this._getProducts(selectedCategories)
  }

}
