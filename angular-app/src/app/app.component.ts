import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductService } from './services/product.service';
import { ToastrManager } from 'ng6-toastr-notifications';

import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
declare var Stripe: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PPM- Product Project Management';


  constructor(private _productService: ProductService,
    public toastr: ToastrManager
    ){

  }
  ngOnInit(){
    
  }
  
  
  

}
