import { Component, OnInit } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  constructor(private productSvc: ProductsService, private shoppingCartSvc: ShoppingCartService) { } //acá se llaman los servicios que se van a ocupar

  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(
      //tap(respuesta => console.log(respuesta))
      tap((products:Product[]) => this.products = products) //definimos y tipamos que vamos a ocupar un array de productos
    ).subscribe();
  }

  addToCart(product:Product):void{
    console.log('Add to cart',product);
    this.shoppingCartSvc.updateCart(product);
  }

}
