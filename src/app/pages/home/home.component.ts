import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT : { [id:number]: number }= { 1: 400, 3: 335, 4: 350 }; // on défini la hauteur en fonction du nombre d'articles à afficher

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',

})
export class HomeComponent implements OnInit, OnDestroy {

  cols = 3 ; // on intialise le nombre de colonnes a afficher (par défaut)
  rowHeight = ROWS_HEIGHT[this.cols]; // hauteur initiale est à 3
  category: string | undefined;

  // variables pour l'import des donnée de l'Api
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;


  constructor(private cartService: CartService, private storeService: StoreService) {} // on injecte le service créé dans le composant

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void { // update the products
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
    .subscribe((_products) => {
      this.products = _products;
    });
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
    this.getProducts();
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

  ngOnDestroy(): void {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  /**
   * pour définir la limite lors de l'appel à l'api
   * @param count 
   */
  onItemsCountChange(newCount: number) :void {
    this.count = newCount.toString();
    this.getProducts(); // on actualise la méthode
  }

  onSortChange(newSort: string) : void {
    this.sort = newSort;
    this.getProducts(); // on actualise la méthode
  }

}
