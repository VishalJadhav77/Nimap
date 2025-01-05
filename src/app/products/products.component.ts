import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  productForm: FormGroup;
  editingProductId: number | null = null;

  currentPage = 1;
  pageSize = 10;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(): void {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getProducts(): void {
    this.apiService.getProducts(this.currentPage, this.pageSize).subscribe((data) => {
      this.products = data;
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;
    if (this.editingProductId) {
      this.apiService
        .updateProduct(this.editingProductId, productData)
        .subscribe(() => {
          this.getProducts();
          this.cancelEdit();
        });
    } else {
      this.apiService.addProduct(productData).subscribe(() => {
        this.getProducts();
        this.productForm.reset();
      });
    }
  }

  editProduct(product: any): void {
    this.editingProductId = product.productId;
    this.productForm.patchValue({
      productName: product.productName,
      categoryId: product.categoryId,
    });
  }

  cancelEdit(): void {
    this.editingProductId = null;
    this.productForm.reset();
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(id).subscribe(() => {
        this.getProducts();
      });
    }
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.getProducts();
  }
}
