import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root' //indica que estará disponible para toda la aplicación
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products'; //Es necesrio especificar la url de donde se tomarán los datos
  constructor( private http:HttpClient ) { }
  
  getProducts():Observable<Product[]>{ //Un observable es un flujo de datos en el tiempo
    return this.http.get<Product[]>(this.apiUrl);
  }

  updateStock(productId: number, stock: number):Observable<any>{ 
    const body = {"stock": stock};
    return this.http.patch<any>(`${this.apiUrl}/${productId}`,body)
  }
}
