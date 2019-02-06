import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.css'],
  providers: [NgbCarouselConfig] 
})
export class CarouselHomeComponent implements OnInit {
  images = ['https://i.imgur.com/Cwyxh7D.jpg', 'https://i.imgur.com/rUlmvqV.jpg','https://i.imgur.com/fTEAPfv.jpg','https://i.imgur.com/0guM0oJ.jpg']
  // images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  constructor(
    config: NgbCarouselConfig, 
    private _http: HttpClient
  ) { 
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
  }

}
