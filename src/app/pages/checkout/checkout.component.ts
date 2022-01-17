import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/interfaces/product.interface';
import { DataService } from '../products/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: Product[] = [];
  stores: Store[] = []; //array de las tiendas
  isDelivery = false;


  model = {
    name: 'Osmar',
    store: '',
    shippingAddress: '',
    city: '',
  };

  constructor(private DataSvc: DataService, private shoppingCartSvc: ShoppingCartService) {}

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({value: FormData }:  NgForm): void {
    //console.log('Guardar', this.model.store);
    const data: Order = { //pintar la data como la interface Order
      //nombre
      //store Id y store Name
      ...FormData,
      date: this.getCurrentDay(),
      pickup: this.isDelivery,

    }
    this.DataSvc.saveOrder(data).pipe(
      tap(res => console.log('Order ->',res)), 
      switchMap((order) =>{
        const orderId = order.id;
        const details = this.prepareDetails();
        return this.DataSvc.saveDetailsOrder({details, orderId});
      }),
      tap(res => console.log('Finish ->', res))//que muestre el objeto "data" en consola
    ).subscribe(); //manda a llamar el metodo de guardar orden del "data.service.ts"
  }

  private getStores(): void {
    this.DataSvc.getStores()
    .pipe(
      tap((stores:Store[]) => this.stores = stores) //que el array de tiendas, sea igual al nuevo array de tiendas pintadas acá
    )
    .subscribe();
  }

  private getCurrentDay():string{
    return new Date().toLocaleDateString();
  }

  //metodo para gestionar el detail
  private prepareDetails(): Details[]{
    const details: Details[] = []; //un details vacío, de tipo "Details[]"

    this.cart.forEach((res: Product) => {
      //console.log(res);
      const {id:productId, name:productName, qty:quantity, stock} = res;
      details.push({productId,productName,quantity});
    });
    return details;
  }

  private getDataCart(): void{
    //usamos .pipe() y .subscribe() siempre que sea un observable
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe()
  }
}
