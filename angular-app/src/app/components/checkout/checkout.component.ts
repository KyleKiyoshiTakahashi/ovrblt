import { Component, OnInit, HostListener, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { environment } from '../../../environments/environment';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
declare var stripe: any;
declare var elements: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']

})
export class CheckoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  email: any;
  address: any;
  city: any;
  state: any;
  zipcode: any;
  phone: any;
  name: any;
  order_total: any;
  items: any;
  totalitems: any;
  subtotal: any;
  total: any;
  subTotalAmount: any;
  order: any;
  oldTotal;
  user: any;
  cart: any;
  userName: any;
  amount: any;
  constructor(
    private _router: Router,
    private _cartService: CartService,
    private http: Http,
    private cd: ChangeDetectorRef) { }


  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };
    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
    this.items = this._cartService.getOrderFromItems();
    this.totalitems = this.items.length;


    var sbttl = this.getTotal()
    this.subtotal = parseFloat(sbttl.toFixed(2));
    var finalTotal = this.subtotal.toFixed(2);
    this.oldTotal = parseFloat(finalTotal) + 6.94;
    this.total = this.oldTotal.toFixed(2);
  }
  getTotal() {
    let subTotal = 0;
    for (var i = 0; i < this.items.length; i++) {
      subTotal = subTotal + this.items[i]['price'];
      this.subTotalAmount = subTotal;
    }
    return subTotal;
  }
  getFinalTotal(){
    var sbttl = this.getTotal()
    this.subtotal = parseFloat(sbttl.toFixed(2));
    var finalTotal = this.subtotal.toFixed(2);
    this.oldTotal = parseFloat(finalTotal) + 6.94;
    this.total = this.oldTotal.toFixed(2);
    return this.total;
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  getOrderFromService() {

  }

  async onSubmit(form: NgForm) {
    const order = {
      userName: this.userName,
      email: this.email,
      address: this.address,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
      items: this.items
    }
    
    this.items = this._cartService.getOrderFromItems();
    
    this._cartService.sendOrderToOrderRoute(order).subscribe( order => {
      
    }

    )
    const { token, error } = await stripe.createToken(this.card, {
      email: this.email
     
    });

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
      this.order = this._cartService.getOrder();
      this._cartService.sendOrder(token).subscribe(data => {

      })
      this._router.navigate(['/checkout/success']);
    }
  }


}
