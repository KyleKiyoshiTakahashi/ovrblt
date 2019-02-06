import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  orderId;
  order;
  constructor(
    private _route: ActivatedRoute,
    private _ngFlashMessageService: NgFlashMessageService,
    public toastr: ToastrManager,
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

  editOrderSubmit(){
    this._productService.editOrder(this.orderId, this.order).subscribe(
      (response) => {
        this.toastr.successToastr('Success! Order Updated!', 'Success!');
      })
  }
  cancelCreate(){
    this._router.navigate(['/admin-dash']);
  }
}
