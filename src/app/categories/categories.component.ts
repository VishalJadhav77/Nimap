import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  categoryForm: FormGroup;
  editingCategoryId: number | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addCategory(): void {
    if (this.categoryForm.invalid) return;

    const categoryData = this.categoryForm.value;
    if (this.editingCategoryId) {
      this.apiService
        .updateCategory(this.editingCategoryId, categoryData)
        .subscribe(() => {
          this.getCategories();
          this.cancelEdit();
        });
    } else {
      this.apiService.addCategory(categoryData).subscribe(() => {
        this.getCategories();
        this.categoryForm.reset();
      });
    }
  }

  editCategory(category: any): void {
    this.editingCategoryId = category.categoryId;
    this.categoryForm.patchValue({ categoryName: category.categoryName });
  }

  cancelEdit(): void {
    this.editingCategoryId = null;
    this.categoryForm.reset();
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.apiService.deleteCategory(id).subscribe(() => {
        this.getCategories();
      });
    }
  }
}
