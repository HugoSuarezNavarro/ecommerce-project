import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        // when it enters the DOM
        query(
          '.product-card', // animate all elements with class product-card
          [
            style({
              width: '100%',
              opacity: 0,
              transform: 'translateX(-20px)',
            }), // Set the starting opacity and transform
            // animate('1ms', style({ transform: 'translateX(-20px)' })), // force layout reflow
            stagger(100, [
              // Delay each element's animation by 100ms
              animate(
                '200ms ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              ), // Animate opacity and transform to the final state
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 0;
  previousCategoryId: number = 0;
  previousKeyword: string = '';
  showGrid: boolean = false;
  searchMode: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchMode = params.has('keyword');
      if (this.searchMode) {
        this.handleSearchProducts(params.get('keyword')!);
      } else {
        this.handleListProducts();
      }
    });
  }

  // list products by keyword
  handleSearchProducts(keyword: string) {
    this.showGrid = false;

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.productService
      .getProductListByKeyword(this.pageNumber - 1, this.pageSize, keyword)
      .subscribe(this.processResponse());
    setTimeout(() => {
      this.showGrid = true;
    }, 0);
  }

  // list all products or list by category if specified
  handleListProducts() {
    this.showGrid = false;
    // Check if categoryId is available / snapshot gives the state of the route and paramMap contains all the URL parameters
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; // Assert the object is not null
    } else {
      this.router.navigateByUrl('/products');
    }

    // if category changes reset page number
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    // if theres no category, currentCategoryId = 0
    this.productService
      .getProductListByCategory(
        this.pageNumber - 1,
        this.pageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResponse());
    setTimeout(() => {
      this.showGrid = true;
    }, 0);
  }

  updatePageSize(size: number) {
    this.pageSize = +size;
    this.pageNumber = 1;
    this.listProducts();
  }

  processResponse() {
    return (data: any) => {
      if (data) {
        this.products = data.content;
        this.pageNumber = data.number + 1;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
      } else {
        this.products = [];
      }
    };
  }

  addToCart(product: Product) {
    const cartItem: CartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
