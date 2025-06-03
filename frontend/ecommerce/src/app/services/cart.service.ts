import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>(); // subclass of Obsevable to publish events
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    let alreadyInCart: boolean = false;
    let existingItem: CartItem | undefined = undefined;

    existingItem = this.cartItems.find(item => item.id === cartItem.id)
    
    alreadyInCart = existingItem != undefined;
    
    if (alreadyInCart) existingItem!.quantity++;
    else this.cartItems.push(cartItem);
    this.calculateCartTotal();
  }

  calculateCartTotal() {
    let totalPrice: number = 0;
    let totalItems: number = 0;
    
    this.cartItems.forEach(item => {
      totalPrice += item.unitPrice * item.quantity;
      totalItems += item.quantity;
    }) 

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalItems);
  }
}
