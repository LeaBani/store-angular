import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT : { [id:number]: number }= { 1: 400, 3: 335, 4: 350 }; // on défini la hauteur en fonction du nombre d'articles à afficher

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',

})
export class HomeComponent implements OnInit {

  cols = 3 ; // on intialise le nombre de colonnes a afficher (par défaut)
  rowHeight = ROWS_HEIGHT[this.cols]; // hauteur initiale est à 3
  category: string | undefined;

  constructor(private cartService: CartService) {} // on injecte le service créé dans le composant

  ngOnInit(): void {
    
  }

  /**
   * ici on modifie le nombre de colonnes a afficher 
   * en cliquant sur les icones, on passe à la variable une nouvelle valeur
   * @param colsNum 
   */
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols]; // on met à jour la hauteur initiale

  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart (product: Product):void { // on importe de l'interface / model Product
    this.cartService.addToCart({ // on utilise la convention de nommage de l'API pour créer l'objet
      product: product.image, // on récupère directement toutes les propriétés grace à TypeScript
      name: product.title, 
      price: product.price,
      quantity: 1,
      id: product.id,

    });
    
  }

}
