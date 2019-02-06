import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Inject, Injectable } from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items;
  totalItems;
  user;

  constructor(
    // @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _router: Router,
    public _authService: AuthService,
    private _ngFlashMessageService: NgFlashMessageService,
    private _cartService: CartService
  ) { }

  ngOnInit() {
    
    this.getUser();
   
    
  }
  onLogoutClick(){
    this._authService.logout();
    this._ngFlashMessageService.showFlashMessage({
      messages: ["you are now logged out"]
    }
    );
    this._router.navigate(['/login']);
    return false;
  }
  getUser(){

    this._authService.getProfile().subscribe( profile  => {
      this.user = profile.user
      console.log("this.user.isAdmin", this.user.isAdmin)
      
    
    },
      err => {
        console.log(err)
        return false;
      });
  }

}
