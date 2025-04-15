import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  products: any[] = [];
  productDetail: any;

  constructor(private baseRepository: BaseRepository) {}

  ngOnInit(): void {
   //this.getproducts();
   // this.getUserById(1);
    //this.createUser();
  }

  getproducts(): void {
    this.baseRepository.request<any[]>('products', 'GET').subscribe({
      next: (data) => {
        debugger;
        this.productDetail = data; // Bind data to the property
        console.log('products fetched:', );
        this.products = this.productDetail.products;
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  getproductsById(productId: number): void {
    this.baseRepository.request<any>(`products/${productId}`, 'GET').subscribe({
      next: (data) => this.productDetail = data,
      error: (err) => console.error('Error fetching product:', err)
    });
  }

  createproduct(): void {
    const newproduct = { name: 'John Doe', email: 'john@example.com' };
    this.baseRepository.request<any>('products', 'POST', newproduct).subscribe({
      next: (data) => console.log('product created:', data),
      error: (err) => console.error('Error creating product:', err)
    });
  }
}

