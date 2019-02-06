import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  searchText: string;
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
