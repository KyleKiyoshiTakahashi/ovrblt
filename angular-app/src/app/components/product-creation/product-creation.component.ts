import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {
  newProduct: any;
  
  constructor(
    private _router: Router,
    private _ngFlashMessageService: NgFlashMessageService,
    public toastr: ToastrManager,
    private _productService: ProductService
   ) { }

  ngOnInit() {
    this.newProduct = { brand: "", name: "", description:"", price: "", image: "", category: "", inventory: ""}
  }
  onNewProductSubmit(){
  
    let obs= this._productService.addProduct(this.newProduct);
    obs.subscribe( data => {
      
      if(data.success){
        this.addedToDB();
        console.log("SUCCESSS")
      }else {
        // console.log("ERROR")
        // console.log(data)
        // if(data['err']['errors']['brand']){
        //   this.brandErrorMessage = data['err']['errors']['brand']['message'];
        // }
        // if(data['err']['errors']['name']){
        //   this.nameErrorMessage = data['err']['errors']['name']['message'];
        // }
        // if(data['err']['errors']['description']){
        //   this.nameErrorMessage = data['err']['errors']['description']['message'];
        // }
        // if(data['err']['errors']['price']){
        //   this.priceErrorMessage = data['err']['errors']['price']['message'];
        // }
        // if(data['err']['errors']['image']){
        //   this.imageErrorMessage = data['err']['errors']['image']['message'];
        // }
        // if(data['err']['errors']['category']){
        //   this.categoryErrorMessage = data['err']['errors']['category']['message'];
        // }
        // if(data['err']['errors']['inventory']){
        //   this.inventoryErrorMessage = data['err']['errors']['inventory']['message'];
        // }
        this._ngFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Something went wrong! Product not added to database."],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true,
          // Time after which the flash disappears defaults to 2000ms
          timeout: false,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'
        });
      }
      console.log("+++++ WE ADDED A NEW PRODUCT +++++", data)
      
    });
    this.newProduct = { brand: "", name: "", description: "", price: "", image: "", category: "", inventory: ""}
    
  }
  cancelCreate() {
    this.newProduct = { brand: "", name: '', description: '', price: 0, image: '', category: '' , inventory: 0};
    this._router.navigate(['/home']);
  }
  addedToDB(){
    this.toastr.successToastr('Product Added to Database', 'Success!');
  }
  
}
