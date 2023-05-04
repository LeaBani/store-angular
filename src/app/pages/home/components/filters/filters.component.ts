import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',

})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>(); // import from angular core

  categories = ['shoes', 'sports']; // on créé la liste des catégories

  constructor(){}

  ngOnInit(): void {

  }

  onShowCategory(category: string): void{
    this.showCategory.emit(category);
  }

}
