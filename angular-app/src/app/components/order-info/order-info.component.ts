import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  orderId;
  order;
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("this is the paramsID", params['id'])
      this.orderId = params['id']
      let obs = this._productService.getOrderById(this.orderId);
      obs.subscribe(
        (order) => {
          this.order = order
      });
    });
  }

}
