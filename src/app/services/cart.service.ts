import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // La programmation réactive est un des principes fondamentaux utilisés par le framework Angular. Le principe consiste à utiliser deux types d'objets, les observateurs et les observables. Les premiers observent les derniers et réagissent lorsque la valeur des observables a été modifiée. Cela permet d'avoir une réactivité importante pour une application et plus spécifiquement sur les interfaces graphiques. La classe "BehaviorSubject" est en fait un sous-type de la classe "Subject", qui est un observable. Elle possède donc des spécificités particulières.

  cart = new BehaviorSubject<Cart>({items:[]}) // Requires an initial value and emits the current value to new subscribers

  constructor(private _snackBar: MatSnackBar) { }
  
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]; // tableau de tous les items présents dans le panier en cours

    const itemInCart = items.find((_item) => _item.id === item.id)// si un item a déjà ajotué au panier, le "_" permet d'avoir accès à la var dans toute l'appli (scope)

    if (itemInCart) { // si l'item existe déjà dans panier,
      itemInCart.quantity += 1; // on incrémente 
    } else {
      items.push(item); // sinon on ajoute l'item au panier
    }

    this.cart.next({ items }); // on émet la valeur a tous les composants qui ont souscrits 
    this._snackBar.open( '1 item added to cart.', 'ok', { duration: 3000 }); // on ouvre une modale 
    // console.log('update', this.cart.value);
    
  }

  removeQuantity(item: CartItem): void {

    let itemForRemoval: CartItem | undefined; // tester si la qté = 0

    let filteredItems = this.cart.value.items.map((_item) =>{ 
    if (_item.id === item.id) {
      _item.quantity--; // abréviation pour enlever 1 

      if (_item.quantity === 0) {
        itemForRemoval = _item;
      }
    }

    return _item;
  });

  if(itemForRemoval){
    filteredItems = this.removeFromCart(itemForRemoval, false);
  }

  this.cart.next({items: filteredItems})
  this._snackBar.open('1 item removed from the cart', 'ok', { duration : 3000 })
  }

  /**
   * On cherche à calculer le prix total du panier
   * @param items 
   * @returns un nouveau tableau d'items
   */
  getTotal(items: Array<CartItem>) : number {
    return items
      .map((item) => item.price * item.quantity) // nouveau tableau avec pour chaque item le prix * qté
      .reduce((prev, current) => prev + current, 0) // nombre précédént + en cours à partir de 0
  }

  /**
   * On cherche à vider le panier
   */
  onClearCart():void {
    this.cart.next({items :[]});
    this._snackBar.open('Cart is cleared.' , 'ok', {duration: 3000})
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
      );

      if(update) {
        this.cart.next({items : filteredItems}); // on affiche le nouveau tableau obtenu
        this._snackBar.open('1 item has been removed from cart', 'ok', { duration: 3000 });
      }

      return filteredItems;
  }

}
