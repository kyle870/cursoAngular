import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product!: Product; //obtener elementos de productos de todos los productos en el array
  @Output() addToCartClick = new EventEmitter<Product>(); //mostrar los productos con cada evento de Click
  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void{
    //console.log("Click", this.product);
    this.addToCartClick.emit(this.product);
  }

}
