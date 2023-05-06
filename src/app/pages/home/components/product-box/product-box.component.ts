import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: 'product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false; // sur la vue avec 1 seule colonne
  @Input() product: Product | undefined; // on rend l'input dynamique

  @Output() addToCard = new EventEmitter(); // on récupère cette méthode dans le home component

  constructor() {}

  ngOnInit(): void {
    
  }

  /**
   * ne retourne rien (void)
   */
  onAddToCart(): void {
    this.addToCard.emit(this.product); // au click, on ajoute le produit au panier
  }

}
