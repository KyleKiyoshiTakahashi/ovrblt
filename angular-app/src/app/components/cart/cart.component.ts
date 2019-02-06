import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items:any;
  quantity:number=1;
  subtotal:number;
  totalitems:number;
  total: number;
  products;
  totalQty;
  totalPrice;
  oldCart: {};
  subTotalAmount;
  oldTotal;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private _route: ActivatedRoute,
    private _cartService: CartService,
    private _ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.items =this._cartService.getOrderFromItems();
    // var oldCart = {'products': {}, 'totalQty': 0, 'totalPrice': 0};
    
    if(this.items==null){
      this._ngFlashMessageService.showFlashMessage({
        messages:['Please add some products to the cart'],
        type: 'danger'

      });
      this.subtotal=0;
      this.total=0;
      this.totalitems=0;
    }
    else{
      // finish this...
    // var storedProduct = this.items = {};
    // this.products = oldCart.products || {};
    // this.totalQty = oldCart.totalQty || 0;
    // this.totalPrice = oldCart.totalPrice || 0;
    // need to get the items price
     this.totalitems=this.items.length;
    
     
    var sbttl = this.getTotal()
    this.subtotal=parseFloat(sbttl.toFixed(2));
    var finalTotal = this.subtotal.toFixed(2);
    this.oldTotal = parseFloat(finalTotal) + 6.94;
    this.total= this.oldTotal.toFixed(2);
    
    }
  }
  getTotal(){
    let subTotal = 0;
    for( var i = 0; i < this.items.length; i++){
      subTotal = subTotal + this.items[i]['price'];
      this.subTotalAmount = subTotal;
    }
    return subTotal;
  }
  removeProduct(i){
    if (i > -1) {
      this.items.splice(i, 1);
    }
    this.totalitems = this.items.length;
    this.subtotal = this.getTotal();
    var finalTotal = this.subtotal.toFixed(2) 
    this.total = parseFloat(finalTotal)+6.94;
    this._cartService.updateItemsInOrder(this.items);
    this.router.navigate(['/cart']);
  }
 
  itemslenth(){
    if(this.items.length ==null|| this.items.length == 0){
      return false; 
    }
    else
    return true;
  }
  checkout(){
    if (this.items.length == null || this.items.length == 0){
     
      this._ngFlashMessageService.showFlashMessage({
        messages:['Please add some items to the cart'],
        type: 'danger'

      });
    }
    else{
      
      this._cartService.storeTotal(this.total);
       this.router.navigate(['/checkout']);
    }

  }
  
  
}
