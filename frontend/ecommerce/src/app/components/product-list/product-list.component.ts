import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  animations: [
  trigger('listAnimation', [ 
    transition(':enter', [ // when it enters the DOM
      query('.product-card', // animate all elements with class product-card
        [
          style({ opacity: 0, transform: 'translateX(-20px)' }), // Set the starting opacity and transform
          stagger(100, [ // Delay each element's animation by 100ms
            animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })) // Animate opacity and transform to the final state
          ])
        ], 
        { optional: true }
      )
    ])
  ])
]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 0;
  showGrid: boolean = false;
  searchMode: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute,private router: Router) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
        this.listProducts();
    });
  }
  
  listProducts() {
    this.route.queryParamMap.subscribe(params => {
        this.searchMode =  params.has('keyword');    
        if (this.searchMode) {
          this.handleSearchProducts(params.get('keyword')!);
        } else {
          this.handleListProducts();
        }
      }
    );
    
  }

  // list products by keyword
  handleSearchProducts(keyword: string) {
    this.showGrid = false;
    
    this.productService.getProductListByKeyword(keyword).subscribe(
      data => {
        this.products = data;
        setTimeout(() => {
          this.showGrid = true;
          console.log('SHOW GRID: ' + this.showGrid)
        }, 0)
      }
    );
  }

  // list all products or list by category if specified
  handleListProducts() {
    this.showGrid = false;
    // Check if categoryId is available / snapshot gives the state of the route and paramMap contains all the URL parameters
    const hasCategoryId: boolean  = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; // Assert the object is not null
    } else {
      this.router.navigateByUrl('/products')
    }
    
    // if theres no category, currentCategoryId = 0
    this.productService.getProductListByCategory(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
        setTimeout(() => {
          this.showGrid = true;
        }, 0)
      },
    );
  }
}
