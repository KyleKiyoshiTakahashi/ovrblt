import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  prodId: any;
  product;
  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    public toastr: ToastrManager,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("this is the paramsID", params['id'])
      this.prodId = params['id']
      let obs = this._productService.getProductById(this.prodId);
      obs.subscribe(
        (product) => {
          this.product = product
      });
    });
  }
  onAddProductToCart(product){
    
    const item = {
      name: product.name,
      product_id: product._id,
      image: product.image,
      price: product.price,
      added: true,
      quantity:1
    }
    this._cartService.storeItemToOrder(item);
    // this._ngFlashMessageService.showFlashMessage({
    //   messages: ["Added to cart!"],
    //   type: 'success',
    //   timeout: 100
    // });
    
    this.addedToCart();
    
  }
  addedToCart() {
    // this.items =this._cartService.getOrderFromItems();
    // this.totalItems=this.items.length;
    this.toastr.successToastr('Added To Cart!', 'Success!');
    console.log("added to cart ####home component###");
    
}

}
