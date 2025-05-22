import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private BASE_URL = 'http://localhost:8080/api/products'

  constructor(private http: HttpClient) { }
  
  // if category  == 0 --> findAllProducts
  getProductListByCategory(categoryId: number): Observable<Product[]> {
    const searchByCategoryUrl = `${this.BASE_URL}${categoryId != 0 ? '/category/'+categoryId : ''}`;
    return this.getProducts(searchByCategoryUrl);
  }

  getProductListByKeyword(keyword: string): Observable<Product[]> {
    const searchByKeywordUrl = `${this.BASE_URL}${'/search?keyword=' + keyword}`;
    return this.getProducts(searchByKeywordUrl);
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

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.http.get<GetResponse>(searchUrl).pipe(
      map(response => response?.content || [])
    )
  }
}

interface GetResponse {
  content: Product[] // it has to be the same name as the json object (in this case an array of Product[] called content)
}










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
