import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseRepository } from '../../services/base.repository';
import { Router, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-cart',
  imports: [ CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
selectedProducts: any;
ViewProducts(arg0: any) {
throw new Error('Method not implemented.');
}
  carts: any[] = [];
  cartDetail: any;
  cartResponseData: any;
  indexId : Number = 0
  modalInstance: Modal | undefined

  constructor(private baseRepository: BaseRepository,private roter:Router) {}

  ngOnInit(): void {
    this.getCarts();
    //this.getCartById(1);
    //this.createCart();
  }
  getCarts(): void {
    debugger
    this.baseRepository.request<any[]>('carts', 'GET').subscribe({
      next: (data) => {
        debugger;
        this.cartResponseData = data; // Bind data to the property
        console.log('Carts fetched:', );
        this.carts = this.cartResponseData.carts;
      },
      error: (err) => console.error('Error fetching carts:', err)
    });
  }

  getCartById(cartId: number): void {
    this.baseRepository.request<any>(`carts/${cartId}`, 'GET').subscribe({
      next: (data) => this.cartDetail = data,
      error: (err) => console.error('Error fetching cart:', err)
    });
  }
  editCartInfo(cartId:number){
    this.roter.navigate(['/addcart'], { queryParams: { cartId: cartId} });
  }

  createProduct(): void {
    const newProduct = { name: 'John Doe', email: 'john@example.com' };
    this.baseRepository.request<any>('products', 'POST', newProduct).subscribe({
      next: (data) => console.log('Product created:', data),
      error: (err) => console.error('Error creating product:', err)
    });
  }

  Deleteinfo(cartId: Number){
    debugger
    this.indexId = cartId;
    this.showModal();
  }

  showModal(){
      const modelShow = document.getElementById('exampleModal');
      if(modelShow){
        this.modalInstance = new Modal(modelShow);
        this.modalInstance.show();
      }
  }
 
  deleteVal(){
    this.baseRepository.request(`carts/${this.indexId}`,'DELETE').subscribe({
      next: (data:any) => {
        console.log(data);
        alert('delete suceess')
        
      },
    });
  }
}