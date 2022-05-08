// export function products(): string {
//     return 'products';
// }
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdersModule } from '@elobong/orders';
import { ProductsSearchComponent } from './components/products-search/products-search.component';

// import { NameComponent } from './name.component';

@NgModule({
    imports: [CommonModule, OrdersModule],
    exports: [ProductsSearchComponent],
    declarations: [ProductsSearchComponent],
    providers: [],
})
export class ProductsModule { }
