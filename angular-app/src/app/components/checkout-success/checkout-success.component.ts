import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {

  constructor(
    private _router: Router,
    private _cartServ: CartService
  ) { }

  ngOnInit() {

  }
  clearCart(){
    this._cartServ.orderClear();
    this._router.navigate(['/home']);
  }
  
}
