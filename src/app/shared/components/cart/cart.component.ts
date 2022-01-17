import { Component } from "@angular/core";
import { ShoppingCartService } from '../../services/shopping-cart.service';


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
})

export class CartComponent{
  /**Inicializamos 3 observables mandados a llamar del shopping-cart.service */
  quantity$ = this.shoppingCartSvc.quantityAction$; //observable por convención del $ al final
  total$ = this.shoppingCartSvc.totalAction$; //observable por convención del $ al final
  cart$ = this.shoppingCartSvc.cartAction$; //observable por convención del $ al final

  constructor(private shoppingCartSvc: ShoppingCartService) {}

}