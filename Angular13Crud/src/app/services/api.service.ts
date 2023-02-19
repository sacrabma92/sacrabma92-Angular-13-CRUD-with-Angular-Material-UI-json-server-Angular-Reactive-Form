import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  postProducto(data: any){
    return this.http.post<any>("http://localhost:3000/listaProductos/", data);
  }

  getProducto(){
    return this.http.get<any>("http://localhost:3000/listaProductos/");
  }

  putProducto(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/listaProductos/" + id, data);
  }

  deleteProducto(id: number){
    return this.http.delete<any>("http://localhost:3000/listaProductos/" + id);
  }
}
