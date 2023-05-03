import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',

})
export class ProductsHeaderComponent implements OnInit {
  sort= 'desc'; // j'initialise l'état de mon bouton de tri
  itemsShowCount=12;

  constructor() { }

  ngOnInit(): void {
    
  }

  /**
   * au click , on attribue la nouvelle valeur asc ou desc
   * @param newSort 
   */
  onSortUpdated(newSort: string): void {
    this.sort = newSort;  
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }
}
