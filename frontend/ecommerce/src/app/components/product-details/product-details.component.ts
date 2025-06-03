import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Always use subscribe so that every change re-triggers this
    this.route.paramMap.subscribe((params) => {
      const productId = +params.get('id')!;
      this.productService
        .getProductDetails(productId)
        .subscribe((product) => (this.product = product));
    });
  }

  addToCart() {
    const cartItem = new CartItem(this.product!);
    this.cartService.addToCart(cartItem);
  }
}

// listProductDetails() {
//   const hasProductId = this.route.snapshot.paramMap.has('id');
//   let productId: number = 0;
//   if (hasProductId) {
//     productId = +this.route.snapshot.paramMap.get('id')!;
//   }
//   this.productService.getProductDetails(productId).subscribe((data) => {
//     this.product = data;
//   });
// }
