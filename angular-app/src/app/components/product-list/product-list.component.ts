import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  
})
export class ProductListComponent implements OnInit {
  allProducts: any = [];
  searchText: string;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProductsFromService();
    
  }
  getProductsFromService(){
    this._productService.getAllProducts().subscribe( products => {
      this.allProducts = products
    })
  }
  destroyProduct(productId){
    let temp= this._productService.deleteAProduct(productId);
    temp.subscribe( data => {
      this.getProductsFromService();
    })
  }
 
  
  
}
