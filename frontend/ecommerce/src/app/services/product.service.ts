import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private BASE_URL = 'http://192.168.0.23:8080/api/products'

  constructor(private http: HttpClient) { }
  
  // if category  == 0 --> findAllProducts
  getProductListByCategory(page: number, size: number, categoryId: number): Observable<GetResponse | undefined> {
    const searchByCategoryUrl = `${this.BASE_URL}${categoryId != 0 ? '/category/'+categoryId : ''}`;
    return this.getProductsPaginated(page, size, searchByCategoryUrl);
  }

  getProductListByKeyword(page: number, size: number, keyword: string): Observable<GetResponse | undefined> {
    const searchByKeywordUrl = `${this.BASE_URL}${'/search?keyword=' + keyword}`;
    return this.getProductsPaginated(page, size,searchByKeywordUrl);
  }
  
  getProductDetails(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`).pipe(
      catchError(err => {
        if (err.status === 404) {
          return of(undefined);
        }
        throw err;
      })
    );
  }

  getProductsPaginated(page: number, size: number, searchUrl: string): Observable<GetResponse | undefined> {
    let url = '';
    if (searchUrl.includes('?')) {
      url = `${searchUrl}&page=${page}&size=${size}`; 
    } else {
      url = `${searchUrl}?page=${page}&size=${size}`;
    }
    return this.http.get<GetResponse>(url).pipe(
      catchError(err => {
        if (err.status === 404) {
          return of(undefined);
        }
        throw err;
      })
    )
  }
}

interface GetResponse {
  // it has to use the same names as the json response
  content: Product[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}


// getProducts(searchUrl: string): Observable<Product[]> {
//   return this.http.get<GetResponse>(searchUrl).pipe(
//     map(response => response?.content || [])
//   )
// }


// getProductList(): Observable<Product[]> {
//   return this.http.get<Product[]>(this.baseUrl).pipe(
//     tap(response => console.log('Raw API response:', response)), 
//     map(response => response.content)
//   )
// }

// getProductList(): Observable<Product[]> {
//   return this.http.get<Product[]>(this.baseUrl).pipe(
//     map(response => response._embedded.products)
//   )
// }

// this.http.get<GetResponse> --> for a json with a structure from spring rest
// interface GetResponse {
//   _embedded: {
//     products: Product[];
//   }
// }
