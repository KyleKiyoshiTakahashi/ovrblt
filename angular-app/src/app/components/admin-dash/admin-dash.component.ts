import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  users: any = [];
  searchUserInfo: string;
  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.getUsersFromService();
  }
  getUsersFromService(){
    this._authService.getAllUsers().subscribe( users => {
      this.users = users
    })
  }

  destroyUser(userId){
    let temp= this._authService.deleteAUser(userId);
    temp.subscribe( data => {
      this.getUsersFromService();
    })
  }

}
