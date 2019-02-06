import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: any;
  first_name: String;
  last_name: String;
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
  userRegisterSubmit() {
    const user = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password
    }

    if (!this._validateService.validateRegister(user)) {
      this._ngFlashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["ALL FIELDS REQUIRED"],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: false,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });
      return false;
    }

    // Validate Email
    if (!this._validateService.validateEmail(user.email)) {
      this._ngFlashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please enter a valid email"],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: false,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });
      return false;
    }

    // Register user
    this._authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._ngFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["You are now registered and can proceed to login"],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: false,
          // Time after which the flash disappears defaults to 2000ms
          timeout: false,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        this._router.navigate(['/login']);
      } else {
        this._ngFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Something went wrong!"],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true,
          // Time after which the flash disappears defaults to 2000ms
          timeout: false,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'
        });
        this._router.navigate(['/login']);
      }
    });
    //   let obs = this._authService.registerUser(this.user);
    //   obs.subscribe(data => {
    //     this.emailErrorMessage = "";
    //     this.first_nameErrorMessage = "";
    //     this.last_nameErrorMessage = "";
    //     this.passwordErrorMessage = "";

    //     if(data['status']){
    //       console.log("success! addign a user")
    //     } else {
    //       console.log("ERROR registering user")
    //       if(data['err']['errors']['email']){
    //         this.emailErrorMessage = data['err']['errors']['email']['message'];
    //       }
    //       if(data['err']['errors']['first_name']){
    //         this.emailErrorMessage = data['err']['errors']['first_name']['message'];
    //       }
    //       if(data['err']['errors']['last_name']){
    //         this.passwordErrorMessage = data['err']['errors']['last_name']['message'];
    //       }
    //       if(data['err']['errors']['password']){
    //         this.passwordErrorMessage = data['err']['errors']['password']['message'];
    //       }
    //     }
    //     console.log("++++++ USER REGISTERING  +++++++", data)
    //   });
  }

}
