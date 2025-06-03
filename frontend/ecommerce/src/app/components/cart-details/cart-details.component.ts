import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { Subject } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.listCartItems();
  }
  
  listCartItems() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(price => this.totalPrice = price);
    this.cartService.totalQuantity.subscribe(quantity => this.totalQuantity = quantity);
    this.cartService.calculateCartTotal();
  }
}