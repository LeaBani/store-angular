import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',

})
export class ProductsHeaderComponent implements OnInit {
  sort= 'desc'; // j'intiliase l'état de mon bouton

  constructor() { }

  ngOnInit(): void {
    
  }

  onSortUpdated(): void {

  }

}
