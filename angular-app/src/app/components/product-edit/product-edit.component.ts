import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  oldProduct;
  product;
  prodId: any;
  index = "";
  brandErrorMessage: any;
  nameErrorMessage: any;
  descriptionErrorMessage: any;
  priceErrorMessage: any;
  imageErrorMessage: any;
  categoryErrorMessage: any;
  inventoryErrorMessage: any;
  productToUpdate;
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router) {

  }
  
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



  editProductSubmit() {
    this._productService.editProduct(this.prodId, this.product).subscribe(
      (response) => {
      this.brandErrorMessage = "";
      this.nameErrorMessage ="";
      this.descriptionErrorMessage = "";
      this.priceErrorMessage ="";
      this.imageErrorMessage = "";
      this.categoryErrorMessage = "";
      this.inventoryErrorMessage = "";
      if(response['status']){
        console.log("SUCCESSS")
      }else {
        console.log("ERROR")
        console.log(response)
        if(response['err']['errors']['brand']){
          this.brandErrorMessage = response['err']['errors']['brand']['message'];
        }
        if(response['err']['errors']['name']){
          this.nameErrorMessage = response['err']['errors']['name']['message'];
        }
        if(response['err']['errors']['description']){
          this.descriptionErrorMessage = response['err']['errors']['description']['message'];
        }
        if(response['err']['errors']['price']){
          this.priceErrorMessage = response['err']['errors']['price']['message'];
        }
        if(response['err']['errors']['image']){
          this.imageErrorMessage = response['err']['errors']['image']['message'];
        }
        if(response['err']['errors']['category']){
          this.categoryErrorMessage = response['err']['errors']['category']['message'];
        }
        if(response['err']['errors']['inventory']){
          this.inventoryErrorMessage = response['err']['errors']['inventory']['message'];
        }
      }
      }
    )
    
  }


  cancelCreate() {


    this._router.navigate(['/admin-dash']);
  }
}



