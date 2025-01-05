import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Categories API
  getCategories(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/categories`);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/categories`, category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/categories/${id}`);
  }

  // Products API
  getProducts(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/products?page=${page}&pageSize=${pageSize}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/products`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/products/${id}`);
  }
}
