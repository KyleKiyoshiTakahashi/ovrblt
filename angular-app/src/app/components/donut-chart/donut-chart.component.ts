import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { draw, generate } from 'patternomaly'
import * as pattern from 'patternomaly';
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  
  public doughnutChartLabels = ['Less Than $20', '$20-$50', '$50-$100', '$100-$150', '$150-$200', '+$200'];
  public doughnutChartData = [];
  public colors = [ {backgroundColor: [
    pattern.draw('square', '#1f77b4'),
    pattern.draw('disc', '#ff7f0e'),
    pattern.draw('zigzag', '#2ca02c'),
    pattern.draw('plus', '#d62728'),
    pattern.draw('weave', '#17becf'),
    pattern.draw('dash', 'rgb(255, 99, 132, 0.4)') // with opacity
  ]}];
  
  public doughnutChartType = 'doughnut';


  
  allOrders;
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._productService.getOrders().subscribe(orders => {
      this.allOrders = orders
      console.log("$$$$ got all the orders donut-chart $$$$")
      var data = [];
      var a = 0;
      var b = 0;
      var c = 0;
      var d = 0;
      var e = 0;
      var f = 0;
      var orders = this.allOrders;
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].amount <= 20) {
          console.log('successsssss a');
          a++;
        }
        if (orders[i].amount >= 20 && orders[i].amount <= 50) {
          console.log('successsssss b');
          b++;
        }
        else if (orders[i].amount >= 50 && orders[i].amount <= 100) {
          console.log('successsssss c');
          c++;
        }
        else if (orders[i].amount >= 100 && orders[i].amount <= 150) {
          console.log('successsssss d');
          d++;
        }
        else if (orders[i].amount >= 150 && orders[i].amount <= 200) {
          console.log('successsssss e');
          e++;
        }
        else if (orders[i].amount >= 200) {
          console.log('successsssss f');
          f++;
        }

      }
      console.log("values$$$$$%%$%%%$", a, b, c, d, e, f);
      // this.doughnutChartData.push(a);
      // this.doughnutChartData.push(b);
      // this.doughnutChartData.push(c);
      // this.doughnutChartData.push(d);
      // this.doughnutChartData.push(e);
      // this.doughnutChartData.push(f);
      data.push(a);
      data.push(b);
      data.push(c);
      data.push(d);
      data.push(e);
      data.push(f);
      this.doughnutChartData = data;
      console.log("donut chart data", this.doughnutChartData)
      
      return [a, b, c, d, e, f];

    })







  }
  // getOrdersFromService(){

  //   this._productService.getOrders().subscribe( orders => {
  //     this.allOrders = orders
  //     console.log("$$$$ got all the orders donut-chart $$$$")

  //     var a = 0;
  //     var b = 0;
  //     var c = 0;
  //     var d = 0;
  //     var e = 0;
  //     var f = 0;
  //     var orders = this.allOrders;
  //     for(var i = 0; i < orders.length; i++){
  //       if(  orders[i].amount <= 20 ){
  //         console.log('successsssss a');
  //         a ++;
  //       } 
  //       if( orders[i].amount >= 20 && orders[i].amount <= 50 ){
  //         console.log('successsssss b');
  //         b ++;
  //       }
  //       else if( orders[i].amount >= 50 && orders[i].amount <= 100 ){
  //         console.log('successsssss c');
  //         c ++;
  //       }
  //       else if( orders[i].amount >= 100 && orders[i].amount <= 150 ){
  //         console.log('successsssss d');
  //         d ++;
  //       }
  //       else if( orders[i].amount >= 150 && orders[i].amount <= 200 ){
  //         console.log('successsssss e');
  //         e ++;
  //       }
  //       else( orders[i].amount >= 200 ){
  //         console.log('successsssss f' );
  //         f ++;
  //       }

  //     }
  //     console.log("values$$$$$%%$%%%$", a , b, c, d, e, f);

  //     return [a,b,c,d,e,f];

  //   })

  //   doughnutChartData.push(a);
  //   doughnutChartData.push(b)
  //   doughnutChartData.push(c)
  //   doughnutChartData.push(d)
  //   doughnutChartData.push(e)
  //   doughnutChartData.push(f)
  // }


}
