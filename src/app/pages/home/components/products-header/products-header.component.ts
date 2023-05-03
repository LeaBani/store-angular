import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',

})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
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

  /**
   * au click, on sélectionne le nombre d'articles souhaités sur la vue
   * @param count 
   */
  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

}
