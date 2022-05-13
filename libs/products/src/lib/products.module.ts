// export function products(): string {
//     return 'products';
// }
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdersModule } from '@elobong/orders';
import { UiModule } from '@elobong/ui';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating'
import {CheckboxModule} from 'primeng/checkbox';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes:Routes = [
    {
        path: 'products',
        component: ProductsListComponent
    },
    {
        path: 'category/:categoryid',
        component: ProductsListComponent
    },
    {
        path: 'products/:productid',
        component: ProductDetailComponent
    },
]

@NgModule({
    imports: [
        CommonModule, OrdersModule, 
        RouterModule.forChild(routes), 
        ButtonModule, CheckboxModule,
        FormsModule, RatingModule,
        InputNumberModule, UiModule,
    ],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent],
    declarations: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductDetailComponent],
    providers: [],
})
export class ProductsModule { }
