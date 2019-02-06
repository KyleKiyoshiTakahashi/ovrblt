import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any, searchText: any): any {
    // check if ssearch term is undefined
    if(searchText === undefined || searchText === ""){
      return products;
    } 
    // else return updated categories 
    return products.filter(product => product.category.includes(searchText) || product.brand.includes(searchText));
    
  }

}
