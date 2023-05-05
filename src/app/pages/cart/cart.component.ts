import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 3,
    id: 2
  },
]};

  dataSource: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private cartService: CartService) {}

  ngOnInit(): void{
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

/**
 * 
 * @param items attend un tableau d'items
 * @returns un nombre
 */
  getTotal(items: Array<CartItem>) : number {
    return this.cartService.getTotal(items); // on reprend la méthode de service
  }

}
