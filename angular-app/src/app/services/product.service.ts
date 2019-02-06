import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor(private _http: Http ) {}
  // get all products
  getAllProducts(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('products/all', {headers: headers})
      .pipe(map(res => res.json()));
      
  }
  // get product by ID
  getProductById(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('products/product/'+ id, {headers: headers})
      .pipe(map(res => res.json()));
  }

// add product to db
  addProduct(product){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('products/addNewProduct', product, {headers: headers})
      .pipe(map(res => res.json()));
  }
  // edit product by id
  editProduct(id, data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('Edit a product Service');
    return this._http.put('products/edit/'+id, data,{headers: headers} )
      .pipe(map(res => res.json()));
  }
  // delete product by ID
  deleteAProduct(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log('Delete a product Service');
    return this._http.delete('products/destroy/'+id, {headers: headers})
    .pipe(map(res => res.json()));
  }
  // get all orders
  getOrders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('orders/all', {headers: headers})
      .pipe(map(res => res.json()));
  }
  // get number of orders
  getCountOfOrders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('orders/count', {headers: headers})
      .pipe(map(res => res.json()));
  }
  // get total sales amount
  getSalesAmount(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('orders/sales', {headers: headers})
      .pipe(map(res => res.json()));
  }
  // get order by ID
  getOrderById(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('orders/order/'+ id, {headers: headers})
      .pipe(map(res => res.json()));
  }
  // edit an order by ID
  editOrder(id , data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('Edit a product Service');
    return this._http.put('orders/edit/'+id, data,{headers: headers} )
      .pipe(map(res => res.json()));
  }
  // delete an order by ID
  deleteAnOrder(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('Delete a product Service');
    return this._http.delete('orders/destroy/'+id, {headers: headers})
    .pipe(map(res => res.json()));
  }

}
