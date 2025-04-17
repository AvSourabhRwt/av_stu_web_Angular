import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BaseRepository } from '../../services/base.repository';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  getproductIds: number[] = [];
  productData: any[] = [];
  modalInstance: Modal | undefined;
  productForm!: FormGroup;
  errorMessage: string | undefined;


  showModel(): void {
    const modalElement = document.getElementById('expandModel')
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
      this.modalInstance.show();
    }
  }

  constructor(private baseRepository: BaseRepository, private router: Router) {
    this.productForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      tag : new FormControl ('',[Validators.required]),
    });

  }

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts(): void {
    this.baseRepository.request<any[]>('products', 'GET').subscribe({
      next: (data: any) => {
        this.productData = data.products;
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  addCart(products: any) {
    debugger;
    const index = this.getproductIds.indexOf(products);
    if (index !== -1) {
      this.getproductIds.splice(index, 1);
    } else {
      this.getproductIds.push(products);
    }
    console.log(this.getproductIds)
  }

  mergecart() {
    debugger;
    var obj = {
      userId: 1,
      products: this.getproductIds
    }

    this.baseRepository.request('carts/add', "POST", obj).subscribe({
      next: (data: any) => {
        alert('success data add')
        console.log(data);
      },
      error: (err) => {
        this.errorMessage = 'no save data'
      }
    })
  }

  // editProduct(productId:Number){
  //   debugger
  //   this.baseRepository.request(`Products/${productId}`,'GET').subscribe({
  //     next:(data:any)=>{
  //       this.productForm.patchValue({
  //         title:data.title,
  //         category:data.category,
  //         price:data.price,
  //         rating:data.price,
  //         discount:data.price,
  //         description:data.description,
  //         tag:data.tags,
  //       })
  //     }
  //   })
  //   this.showModel()
  // }

  editProduct(productId:Number){
    this.router.navigate(['/addproduct'], { queryParams: { postId:productId} });
  }

  saveProduct() {
    if (this.productForm.valid) {
      const productValue = {
        title: this.productForm.value.title,
        category: this.productForm.value.category,
        price: this.productForm.value.price,
        rating: this.productForm.value.rating,
        DiscountPercentage: this.productForm.value.discount,
        description: this.productForm.value.description,
        tags : this.productForm.value.tag,
      };

      this.baseRepository.request('products/add', 'POST', productValue).subscribe({
        next: (data: any) => {
          alert('success products')
          console.log(data);
        },
        error: (err) => {
          this.errorMessage = 'no save data'
        }
      })
    }
  }

}

function addCart(products: any, any: any) {
  throw new Error('Function not implemented.');
}

