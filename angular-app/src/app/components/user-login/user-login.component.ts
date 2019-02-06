import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  email: String;
  password: String;
  constructor(
    private _router: Router,
    private _validateService: ValidateService,
    private _authService: AuthService,
    private _ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    
  }
  userLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
    this._authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this._authService.storeUserData(data.token, data.user);
        this._ngFlashMessageService.showFlashMessage({
          messages: ["you are now logged in!"],
          type: 'success'
        });
        this._router.navigate(['dashboard']);
      } else {
        this._ngFlashMessageService.showFlashMessage({
          messages:['Invalid Login Credentials'],
          type: 'danger'

        });
        this._router.navigate(['login']);
      }
    });
  }
}
