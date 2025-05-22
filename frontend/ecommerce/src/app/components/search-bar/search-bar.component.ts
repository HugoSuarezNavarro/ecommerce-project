import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchValue: string = ''
  
  constructor(private router: Router) {}


  searchByKeyword(input: string) {
    this.router.navigate(['/products/search'], {queryParams: {keyword: input}});
  }

  clearSearchInput() {
    this.searchValue = '';
  }
}
