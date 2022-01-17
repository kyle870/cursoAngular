import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  products: Product[] = [];
  //creamos un nuevo observable BehaviorSubject el cual require un valor por defecto
  /**Para el carrito */
  private cartSubject = new BehaviorSubject<Product[]>([]); //le pasamos un array vacío ya que toma un array
  /**Para saber el monto total */
  private totalSubject = new BehaviorSubject<number>(0);
  /**para saber la cantidad total */
  private quantitySubject = new BehaviorSubject<number>(0);

  /**Devolver los observable a la aplicación para quien lo necesite consumir */
  get totalAction$(): Observable<number> { //cuando se trabaja con observables se pone el $ al final
    return this.totalSubject.asObservable();
  } 
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  /**Método intermedio para actualizar el carrito y ser intermediario de los otros métodos abajo que son privados */
  updateCart(product:Product): void{
      this.addToCart(product);
      this.quantityProducts();
      this.calcTotal();
  }

  /** Métodos para el uso del carrito de compras, son privados, exclusivos para este servicio */
  private addToCart(product:Product): void{
    const isProductInCart = this.products.find(({id})=> id === product.id) //verificar si hay un producto con ese mismo id

    if (isProductInCart) {
      isProductInCart.qty+=1; //aumentar la cantidad si es ese mismo producto 
    } else {
      this.products.push({...product,qty:1}); //concatenamos la cantidad al producto que recibimos en caso que no esté, es decir, que sea nuevo
    }
    this.cartSubject.next(this.products); //añadir los elementos al obervable
  }

  private quantityProducts(): void{
      const quantity = this.products.reduce((acc,prod) => acc+=prod.qty,0);
      this.quantitySubject.next(quantity);//pasar el valor de la cantidad al observable
  }

  private calcTotal(): void{ //void significa que nada retorna
    const total = this.products.reduce((acc,prod) => acc+= (prod.price*prod.qty),0);
    this.totalSubject.next(total); //pasar el valor del total al observable
  }
}
