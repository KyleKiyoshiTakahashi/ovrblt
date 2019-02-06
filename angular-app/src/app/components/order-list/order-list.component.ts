import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  allOrders: any;
  total: any;
  totalAmount: any;
  totalAmt: any;
  orders;

  notShipped;
  subTotal: any;
  orderCount: any;
  len;
  order;
  orderCt;
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orders = this.getOrdersFromService();
    this.getTotal();
    this.getCountOfOrdersFromService();

    
    
   
  }
  getOrdersFromService(){
    this._productService.getOrders().subscribe( orders => {
      this.allOrders = orders
      // get count of orders not shipped
      var notShipped = 0;
      var orders = this.allOrders;
      for(var i = 0; i < orders.length; i++){
        if(orders[i].status == "Pending"){
          notShipped ++
        }
      }
      this.notShipped = notShipped;
      return notShipped;
    
    })
    
  }
  getCountOfOrdersFromService(){
    this._productService.getCountOfOrders().subscribe( length => {
      this.orderCount = length
      console.log("32423423 order count asdhiuhaodiuhio", this.orderCount)
    })
  }
  
  getTotal(){
    this._productService.getOrders().subscribe( orders => {
      this.allOrders = orders
      // get total amount of all orders in db
      var amount = 0;
      var orders = this.allOrders;
      for(var i = 0; i<orders.length;i++){
        console.log("order amount ", orders[i].amount)
        amount = amount + parseFloat(orders[i].amount);
      }
      this.totalAmount = amount.toFixed(2);
      return amount;
    })
  }
 
  destroyOrder(orderId){
    
      let temp= this._productService.deleteAnOrder(orderId);
      temp.subscribe( data => {
        this.getOrdersFromService();
      })
    
  }
  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }
}
