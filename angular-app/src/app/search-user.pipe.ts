import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform( users: any, searchText: any): any {
    if(searchText === undefined || searchText === ""){
      return users;
    
    }
    // else return updated categories 
    return users.filter(user => user.email.includes(searchText)  );
    
  }

}
