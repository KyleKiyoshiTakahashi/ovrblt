import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-backpacks-category',
  templateUrl: './backpacks-category.component.html',
  styleUrls: ['./backpacks-category.component.css']
})
export class BackpacksCategoryComponent implements OnInit {
  allProducts: any;
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _cartService: CartService,
    private _ngFlashMessageService: NgFlashMessageService,
    public toastr: ToastrManager,
    private _router: Router
  ) { }

  ngOnInit() {
    this._productService.getAllProducts().subscribe( products => {
      this.allProducts = products
    })
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
