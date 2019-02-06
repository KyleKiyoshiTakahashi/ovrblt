import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId;
  user;
  constructor(
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("this is the paramsID", params['id'])
      this.userId = params['id']
      let obs = this._authService.getUserById(this.userId);
      obs.subscribe(
        (user) => {
          this.user= user
      });
    });
  }
  editUserSubmit() {
    this._authService.editUser(this.userId, this.user).subscribe(
      (response) => {

      })
    }

  cancelCreate() {
      this._router.navigate(['/admin-dash']);
  }

}
