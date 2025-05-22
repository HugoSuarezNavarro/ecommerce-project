import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductCategoryService } from '../../services/product-category.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-category-list',
  standalone: false,
  templateUrl: './product-category-list.component.html',
  styleUrl: './product-category-list.component.css'
})
export class ProductCategoryListComponent implements OnInit {
  
  @Output() categoryClickEvent: EventEmitter<void> = new EventEmitter();
  categories: ProductCategory[] = [];
  isActive: boolean = false;
  isBouncing: boolean = false;
  
  constructor(private productCategoryService: ProductCategoryService, private router: Router) {}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.productCategoryService.getProductCategoryList().subscribe(
      data => {
        this.categories = data;
      }
    );
  }
  
  // Propagar evento click en la categoria al padre (app.component)
  onCategoryClick(): void {
    this.categoryClickEvent.emit();
  }

  onLinkClick() {
    // Trigger the bounce effect
    this.isBouncing = true;

    // Reset the bounce effect after the animation ends (e.g., 600ms)
    setTimeout(() => {
      this.isBouncing = false;
    }, 600); // This should match the duration of your animation
  }
}

