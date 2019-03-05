import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import "rxjs/add/operator/map";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  authToken: any;
  user: any;
  product: any;
  oldproduct: any;
  role: any;
  iteml: any;
  totall: any;
  constructor(
    private _http: Http
  ) { }
 

  storeItemToOrder(item: any) {
    var tempItem = JSON.parse(localStorage.getItem("items"));
    if (tempItem == null) tempItem = [];
    localStorage.setItem("item", JSON.stringify(item));
    tempItem.push(item);
    localStorage.setItem("items", JSON.stringify(tempItem));
    console.log("added to cart ####cart service###");

  }

  updateItemsInOrder(items: any) {
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));
  }
  getOrderFromItems() {
    return this.iteml = JSON.parse(localStorage.getItem("items"));
  }

  orderClear() {
    localStorage.removeItem("items");
    localStorage.removeItem("item");
  }
  getOrder() {
    return this.iteml = JSON.parse(localStorage.getItem("items"));;
  }
  storeTotal(total: any) {
    this.totall = total;
  }

  getTotal() {
    return this.totall;
  }
  
  // send order to create stripe customer and charge
  sendOrder(token){
    let headers = new Headers({'token': token, 'amount': this.totall});
    headers.append('Content-Type', 'application/json');
    console.log("this is the token " + token);
    return this._http.post('orders/add',  token, { headers: headers})
      .pipe(map(res => res.json())
      )
  }
  // send the order to be put into DB
  sendOrderToOrderRoute(items){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("these are the items from the service "+ items);
    return this._http.post('orders/addItems',  items,  { headers: headers})
      .pipe(map(res => res.json())
      )
  }

}
