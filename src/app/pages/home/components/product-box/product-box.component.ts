import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: 'product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false; // sur la vue avec 1 seule colonne
  product: Product | undefined = { // on utilise le product.model
    id: 1,
    title: 'Snickers',
    price: 150,
    category: 'shoes',
    description: 'description',
    image: 'https://via.placeholder.com/150',
  };

  @Output() addToCard = new EventEmitter(); // on récupère cette méthode dans le home component

  constructor() {}

  ngOnInit(): void {
    
  }

  /**
   * ne retourne rien (void)
   */
  onAddToCart(): void {

  }

}
