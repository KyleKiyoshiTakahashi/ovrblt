import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBrand'
})
export class SearchBrandPipe implements PipeTransform {

  transform(products: any, searchText: any): any {
    if(searchText === undefined || searchText === ""){
      return products;
    } 
    // else return updated categories 
    return products.filter(product => product.brand.includes(searchText) );
  }

}
